interface Prompt {
  input: string
  output: string
  createdAt: adminDb.fireStore.Timestamp
  tags: string[]
  isSaved: boolean
}
