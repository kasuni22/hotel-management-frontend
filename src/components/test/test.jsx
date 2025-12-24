import { useState } from "react";
import uploadMedia from "../../utils/mediaUpload";

export default function TestComponent() {
  const [file, setFile] = useState(null);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col gap-4">

      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />

      <button
        onClick={() => {
          if (!file) {
            alert("Please select a file first!");
            return;
          }
          uploadMedia(file);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>

    </div>
  );
}
