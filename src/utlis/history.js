// import sample from 'lodash.sample'

export const setHistoryBook = (arr) => {
  const hisotry = localStorage.getItem("historyBook")
  if(!arr?.bookId) return;
  try {
    const historyArr = JSON.parse(hisotry) ?? []
    localStorage.setItem("historyBook", JSON.stringify([...historyArr, arr]))
  } catch (error) {
    console.log(hisotry)
  }
}


export const getHistoryBook = () => {
  try {
    const books = localStorage.getItem('historyBook');
    const historyBook = JSON.parse(books) ?? [];
    return historyBook.slice(0, 5) ?? [];
  } catch (error) {
    console.log(error)
  }
}
