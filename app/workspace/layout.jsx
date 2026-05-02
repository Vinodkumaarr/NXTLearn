import React from "react"
import  WorkspaceProvider from './provider'

function WorkSpaceLayout({children}) {
  return (
    <WorkspaceProvider>
      {children}
    </WorkspaceProvider>
  )
}

export default WorkSpaceLayout