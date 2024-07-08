'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from '~/components/ui/button';

const FormDelete = ({ imageId }: { imageId: number }) => {

  const router = useRouter();

  const onSubmit = async () => {
    await fetch('http://localhost:3000/api/deleteImage', {
      method: 'post',
      body: JSON.stringify(imageId)
    })

    router.refresh(); 
  }

  return (
    <form
    onSubmit={async (e) => {
      e.preventDefault();
      await onSubmit();
    }}
  >
    <Button type="submit" variant="destructive">
      Delete
    </Button>
  </form>
  )
}

export default FormDelete