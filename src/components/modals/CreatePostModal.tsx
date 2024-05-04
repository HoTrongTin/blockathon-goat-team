import React, { useState } from 'react'
import { Button, Input, Modal, Switch } from 'antd'

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`)
}

const CreatePostModal: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Input placeholder="Basic usage" />
        <Input placeholder="Basic usage" />
        <Input type="file" placeholder="Basic usage" />
        <Switch defaultChecked onChange={onChange} />
      </Modal>
    </>
  )
}

export default CreatePostModal
