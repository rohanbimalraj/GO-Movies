export function extract(items) {
    const movies = items.map((item) => {
      const obj = {
        id: '',
        title: ''
      }
      if ('movie' in item) {
      const movie = item.movie
      obj.id = movie.ids.imdb
      obj.title = movie.title 
      } else  {
        obj.id = item.ids.imdb
        obj.title = item.title
      }
      return obj
    })
    return movies
  }