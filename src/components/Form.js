import React, { useState, useEffect, useMemo, useCallback } from "react";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import Button from "./Button";
import { create } from "../actions/content";
import copy from "copy-to-clipboard";

const Form = () => {
  // State to hold text content
  const [content, setContent] = useState([
    { type: "paragraph", children: [{ text: "Some text in a paragraph" }] },
  ]);
  const [newUrl, setNewUrl] = useState(null);

  //   useMemo to limit the number render operations needed for the editor
  const editor = useMemo(() => withReact(createEditor()), []);

  //
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const readOut = () => {
    console.log("content: ", content[0].children[0].text);
  };

  const createUrl = async () => {
    const url = await create(content[0].children[0].text);
    setNewUrl("http://localhost:3001/script/" + url.data.param);
  };

  const Url = () => {
    return (
      <div>
        <h2>{newUrl}</h2>
        <button onClick={() => copy(newUrl)}>Click To Copy</button>
      </div>
    );
  };

  return (
    <div>
      <Slate
        editor={editor}
        value={content}
        onChange={(newValue) => setContent(newValue)}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }
            switch (event.key) {
              case "`": {
                event.preventDefault();
                const [match] = Editor.nodes(editor, {
                  match: (n) => n.type === "code",
                });
                Transforms.setNodes(
                  editor,
                  { type: match ? null : "code" },
                  { match: (n) => Editor.isBlock(editor, n) }
                );
                break;
              }
              case "b": {
                event.preventDefault();
                Transforms.setNodes(
                  editor,
                  { bold: true },
                  { match: (n) => Text.isText(n), split: true }
                );
              }
            }
          }}
        />
        <Button submitContent={createUrl} />
      </Slate>
      {newUrl ? <Url /> : null}
    </div>
  );
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default Form;
