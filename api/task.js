import Request from "./request"

class Task extends Request {
  getAll() {
    return this.request('todos')
  }

  getById({ id }) {
    return this.request(`todos/${id}`)
  }

  create({ description, priority, category, endDate }) {
    const userId = "ed4388bd-8f12-4de9-bc39-4109359bb361";
    const categoria = category;
    const estado = 'Pendiente';
    const fechaFinalizacion = endDate;
    const descripcion = description;
    return this.request('todos',
    { method: 'post', body: { userId, descripcion, categoria, estado, fechaFinalizacion }})
  }

  updatePriorities({tasks}) {
    return Promise.all(
      tasks.map(({id, priority }) => {
      this.request(`todos/${id}`,
        { method: 'patch',
        body: { priority }})
    }))
  }

  updateStatus({id}) {
    return this.request(`todos/${id}`,{ method: 'patch'})
  }

  delete({ id }) {
    return this.request(`todos/${id}`,{ method: 'delete'})
  }
}

export default Task;
