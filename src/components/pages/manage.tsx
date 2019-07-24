import { exists, window } from "browser-monads";
import { Button } from "carbon-components-react";
import { Field, Formik } from "formik";
import { useObservable } from "mobx-react-lite";
import React from "react";
import * as Yup from "yup";

import { PagesStore } from "../../stores/pages.store";
import { textInput } from "../@core/formik";
import { CKEditor, ClassicEditor, SimpleuploadPlugin } from "/@components/@core/CKEditor";
import { local2utc } from "/@utils/basic";

export default function ManagePage() {
  const pagesStore = useObservable(new PagesStore());

  const pageForm = {
    validationSchema: Yup.object().shape({
      parentId: Yup.number().required(),
      title: Yup.string().required(),
      authorId: Yup.string().required(),
    }),
    initialValues: {
      parentId: -1,
      title: "",
      authorId: "1",
    },
  };

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    pagesStore.createPage({
      ...values,
      createdOn: local2utc(),
      modifiedOn: local2utc(),
      isDeleted: false,
    });
  };

  const Editor = props =>
    exists(window) ? (
      <CKEditor
        editor={ClassicEditor}
        data="<p></p>"
        config={{
          extraPlugins: [SimpleuploadPlugin],
          simpleUpload: {
            uploadUrl: "http://localhost:3100/upload",
          },
        }}
        onChange={(event, editor) => {
          props.setFieldValue("content", editor.getData());
        }}
      />
    ) : (
      <>Editor</>
    );

  return (
    <Formik
      {...pageForm}
      onSubmit={handleSubmit}
      render={props => (
        <form className="bx--form" onSubmit={props.handleSubmit}>
          <div className="bx--row">
            <div className="bx--col-lg-4 bx--col-sm-12">
              <Field label="Title" name="title" component={textInput} />
            </div>
          </div>
          <div className="bx--row">
            <div className="bx--col-lg-4 bx--col-sm-12">
              <Editor props={props} />
            </div>
          </div>

          <Button type="submit" disabled={!props.isValid}>
            Create Page
          </Button>
        </form>
      )}
    />
  );
}
