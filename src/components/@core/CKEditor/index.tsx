import Loadable from "@loadable/component";

export const ClassicEditor = Loadable(() =>
  import("@ckeditor/ckeditor5-build-classic")
);
export const CKEditor = Loadable(() => import("@ckeditor/ckeditor5-react"));
export const SimpleuploadPlugin = Loadable(() =>
  import("ckeditor5-simple-upload/src/simpleupload")
);
