//IMPLEMENTAR FILE SYSTEM PICKER
//IMPLEMENTAR FILE LIST TO UPLOAD (PUSH FILES FROM BOTH DROP AND DOWN AND ATTACH BUTTON)

import { useHandleUpload } from "../hooks/useFileUploader";

// CONNECT FILE LIST TO SEND BUTTON
export const AttachButton = () => {
  return (
    <>
      <input
        type="file"
        multiple={true}
        onChange={(e) => {
          if (e.target.files) setFiles(e.target.files);
        }}
      ></input>
    </>
  );
};
