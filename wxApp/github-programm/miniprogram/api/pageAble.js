const parseLinks = header => {
  if (!header || header.length == 0) {
    return {}
  }
  const links = {}

  const parts = header.split(',')
  parts.map(p => {
    const section = p.split(';')
    if (section.length != 2) {
      throw new Error("section could not be split on ';'")
    }
    // console.log(111, section[0].replace(/<(.*)>/, '$1'));
    // $1 正则里面的 代表分组 
    const url = section[0].replace(/<(.*)>/, '$1').trim()
    const name = section[1].replace(/<(.*)>/, '$1').trim()

    links[name] = url
  })

  return links
}
const wrap = () => {
  // get().then();
  return new Promise((resolve, reject) => {
    promise.then(({headers, data}) => {
      // headers
      //Link:<https://api.github.com/events?page=2>; rel="next", <https://api.github.com/events?page=10>; rel="last"
      const links = parseLinks(headers.Link);
      // {rel="next":}
      const nextUrl = links['rel="next"'];
      if(nextUrl) {
        return resolve({
          data,
          next: () => wrap(new Promise((resolve, reject) => {
            // 发请求
            wx.request({
              url: nextUrl,
              success: res => {
                resolve({
                  data: res.data,
                  headers: res.headers,
                  // next: null
                });
              },
              fail: err => {
                reject(err);
              }
            })
          }))
        })
      } 
      return resolve({
        data, 
        next: null
      })
    })
  })
}
// pageAble.wrap()

module.exports = {
  wrap
}