
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Todo from './todos/Todo'

describe('Todo', () => {
  const todo = { _id: '1', text: 'Write code', done: false }
  it('renders the todo text', () => {
    render(<Todo todo={todo} deleteTodo={vi.fn()} completeTodo={vi.fn} />)
    expect(screen.getByText('Write code')).toBeDefined()
  })

  it('shows "not done" status when todo is not done', () => {
    render(<Todo todo={todo} deleteTodo={vi.fn()} completeTodo={vi.fn} />)
    expect(screen.getByText('This todo is not done')).toBeDefined()
  })


})