import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { MeOnChainServiceInstance } from '~/constants/instance'

const getUploadedFile = fName => `${import.meta.env.VITE_BE_LINK}/file/${fName}`

const useUploadFiles = () => {
  const handleFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const { data: resp } = await MeOnChainServiceInstance.post('/file', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    return getUploadedFile(resp?.filename)
  }

  const handleSubmitMultipleFiles = async (files: File[]) => {
    const urls = []
    for (let idx = 0; idx < files.length; idx++) {
      const element = files[idx]
      const link = await handleFile(element)
      urls.push(link)
    }

    return urls
  }

  const uploadFiles = useMutation({
    mutationKey: ['upload-file'],
    mutationFn: handleSubmitMultipleFiles
  })

  return {
    uploadFiles
  }
}

export default useUploadFiles
