function marry(man, woman) {
  woman.hasban = man;
  man.wife = woman;
  return {
    father: man,
    mother: woman
  }
}
let family = marry({
  name:'John'
}, {
  name: 'Ann'
})


    // Global
    //   |
    //   Object(Family)
    // |               |
// Object(father) <-> Object(month)