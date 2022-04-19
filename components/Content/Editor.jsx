import {CKEditor} from "@ckeditor/ckeditor5-react";
import Ckeditor from "ckeditor5-custom-build"

const Editor = ({data, setData}) => {
    return <CKEditor
        editor={Ckeditor}
        config={
            {
                simpleUpload: {
                    // The URL that the images are uploaded to.
                    uploadUrl: 'https://waffle.zvshka.keenetic.pro/api/images',
                }
            }
        }
        data={data}
        onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
            const data = editor.getData();
            setData(data)
            // console.log({event, editor, data});
        }}
        onBlur={(event, editor) => {
            // console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
            // console.log("Focus.", editor);
        }}
    />

}

export default Editor;