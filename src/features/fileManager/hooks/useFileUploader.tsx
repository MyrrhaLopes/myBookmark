import { useState } from "react";
import { supabase } from "../../../supabaseClient";

export const useHandleUpload = () => {
  const [files, setFiles] = useState<FileList>();
  const [status, setStatus] = useState("idle");

  // Example async action (e.g. upload)
  const uploadFiles = async () => {
    // Replace with real upload logic
    if (!files) throw "No files to upload";
    for (const f of files) {
      setStatus("uploading");
      // await apiUpload(f);
      console.log("Uploading", f.name);
      const { data, error } = await supabase.storage
        .from("bookmarks")
        .upload(f.name, f);
      if (error) {
        setStatus("error");
        throw new Error(error.message);
      } else setStatus("sent");
      console.log(data);
    }
    setFiles(undefined);
  };

  return {
    files,
    setFiles,
    uploadFiles,
    status,
  };
};
