// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import CKEditor from "@ckeditor/ckeditor5-react";
import { Button } from "carbon-components-react";
import SimpleuploadPlugin from "ckeditor5-simple-upload/src/simpleupload";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import { textInput } from "/@components/@core/formik";
import { local2utc } from "/@utils/basic";

export default function ManagePage({ pagesStore, mode, singlePage, id }) {
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    setInitialValues(
      mode !== "edit" ? { ...singlePage, parentId: id } : singlePage
    );
  }, [singlePage]);

  const pageForm = {
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string().required(),
      authorId: Yup.string().required(),
    }),
  };

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    pagesStore.createOrUpdatePage({
      ...values,
      createdOn: local2utc(),
      modifiedOn: local2utc(),
      isDeleted: false,
    });
  };

  return initialValues ? (
    <Formik
      {...pageForm}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={props => (
        <form className="bx--form" onSubmit={props.handleSubmit}>
          <div className="bx--row">
            <div className="bx--col-lg-8 bx--col-sm-12">
              <Field label="Title" name="title" component={textInput} />
            </div>
          </div>
          <div className="bx--row">
            <div className="bx--col-lg-8 bx--col-sm-12">
              <CKEditor
                editor={DecoupledEditor}
                onInit={editor => {
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                    );
                }}
                data={props.values.content}
                config={{
                  extraPlugins: [SimpleuploadPlugin],
                  simpleUpload: {
                    uploadUrl: `${process.env.ENDPOINT_PAGES}/image`,
                  },
                }}
                onChange={(event, editor) => {
                  props.setFieldValue("content", editor.getData());
                }}
              />
            </div>
          </div>
          <br />
          <Button type="submit" disabled={!props.isValid}>
            Create/Update Page
          </Button>
        </form>
      )}
    />
  ) : (
    <>"Loading"</>
  );
}
