'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog ref={dialogRef} className="m-0 h-screen w-screen bg-black/90 text-white flex items-center justify-center" onClose={onDismiss}>
      <div className="relative p-4  rounded max-w-3xl w-full flex">
        <div className="flex-1">
          {children}
        </div>
        <div className="relative w-1/3 p-4">
          <button onClick={onDismiss} className="absolute top-4 right-4 text-white bg-red-600 px-2 py-1 rounded">Close</button>
        </div>
      </div>
    </dialog>,
    document.getElementById('modal-root')!
  );
}
