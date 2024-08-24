export function extract(items) {
    const movies = items.map((item) => {
      const obj = {
        ids: {
          imdb: '',
          tmdb: ''
        },
        title: ''
      }
      if ('movie' in item) {
      const movie = item.movie
      obj.ids.imdb = movie.ids.imdb
      obj.ids.tmdb = movie.ids.tmdb
      obj.title = movie.title 
      } else  {
        obj.ids.imdb = item.ids.imdb
        obj.ids.tmdb = item.ids.tmdb
        obj.title = item.title
      }
      return obj
    })
    return movies
  }