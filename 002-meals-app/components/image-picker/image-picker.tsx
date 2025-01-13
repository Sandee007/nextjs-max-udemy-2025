"use client";

import { ChangeEvent, RefObject, useRef, useState } from "react";
import styles from "./image-picker.module.css";
import Image from "next/image";

interface Props {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const imageInput: RefObject<HTMLInputElement | null> = useRef(null);

  function pickImage() {
    imageInput?.current?.click();
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event?.target?.files?.[0];

    if (!file) {
      setPreviewImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}> {label} </label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!previewImage && <p>No image picked yet.</p>}
          {previewImage && <Image src={previewImage} alt="selected image" fill />}
        </div>
        <input
          ref={imageInput}
          className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleImageChange}
          required
        />
        <button className={styles.button} type="button" onClick={pickImage}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
