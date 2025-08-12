import { useState } from "react";
import { supabase } from "../../../supabaseClient";

export const useHandleUpload = () => {
  const [files, setFiles] = useState<FileList>();

  // Example async action (e.g. upload)
  const uploadFiles = async () => {
    // Replace with real upload logic
    if (!files) throw "No files to upload";
    for (const f of files) {
      // await apiUpload(f);
      console.log("Uploading", f.name);
      const { data, error } = await supabase.storage
        .from("bookmarks")
        .upload(f.name, f);
      if (error) throw error;
      else console.log(data);
    }
    setFiles(undefined);
  };

  return {
    files,
    setFiles,
    uploadFiles,
  };
};
