

function reconcileOrder(existing, incoming) {
  const updatedBook = []



  for (let i = 0; i < existing.length; i++) {
    if (incoming.type !== existing[i].type && incoming.price === existing[i].price && incoming.quantity > existing[i].quantity) {
      incoming.quantity = (incoming.quantity - existing[i].quantity)
      existing.splice(i, 1)
      i--
    } else if (incoming.type !== existing[i].type && incoming.price === existing[i].price && incoming.quantity === existing[i].quantity) {
      existing.splice(i, 1)
      i--
      incoming = null
    } else if (incoming.type !== existing[i].type && incoming.price === existing[i].price && incoming.quantity < existing[i].quantity) {
      existing[i].quantity = (existing[i].quantity - incoming.quantity)
      incoming = null
      existing.push(existing[i])
      existing.splice(i, 1)
      i--
    }



    if (incoming === null) {
      break
    }
  }
  if (incoming === null && existing.length === 0) {
    updatedBook = []
  } else if (existing.length !== 0 && incoming === null) {
    updatedBook.push(...existing)
  } else if (existing.length === 0 && incoming !== null) {
    updatedBook.push(incoming)
  } else if (existing.length !== 0 && incoming !== null) {
    updatedBook.push(...existing)
    updatedBook.push(incoming)
  }

  return updatedBook
}












module.exports = reconcileOrder
