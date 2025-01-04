"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

export default function BlockNoteContainer({
  initialContent,
  editable,
  setContent,
}: {
  initialContent: string;
  editable: boolean;
  setContent: (content: string) => void;
}) {
  //   const editor = useCreateBlockNote({
  //     initialContent: testing as any,
  //   });
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  const handlePrintContent = () => {
    const content = editor.document;
    // console.log(content);
    setContent(JSON.stringify(content));
    // You can process the content as needed, e.g., convert to JSON or HTML
  };

  // Renders the editor instance using a React component.
  return (
    <div className="bg-[#1f1f1f] py-4 rounded-md">
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={handlePrintContent}
        theme={"dark"}
      />
    </div>
  );
}
