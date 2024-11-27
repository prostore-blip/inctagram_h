export const useAddIdToArray = (array: string[]) => {
  /**
   * массив для карусели на основе загруженных с ПК картинок, добавляем id
   */
  const carouselArray = array.map((pr, i) => {
    return { id: Math.random() + i, url: pr }
  })

  return carouselArray
}
