import { mapGetters, mapMutations, mapActions } from 'vuex'

export const searchMixin = {
  data () {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  methods: {
    onQueryChange (query) {
      this.query = query.trim()
    },
    blurInput () {
      this.$refs.searchBox.blur()    
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch(song) {
      console.log(song)
      this.selectPlaySong(song)
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory', 'selectPlaySong'
    ])
  },
}

export const playerMixin = {
  computed: {
    ...mapGetters([
      'playList', 
      'currentSong',
      'currentIndex',
      'favoriteList'
    ]),
    favoriteIcon () {
      return this.getFavoriteIcon(this.currentSong)
    }
  },
  methods: {
    toggleFavorite (song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon (song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      } else {
        return 'icon-not-favorite'
      }
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex((item, song) => {
        return item.id === song.id
      })
      return index > -1
    },
    ...mapMutations({
      setPlaylist: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlaying: 'SET_PLAYING'
    }),
    ...mapActions([
      'saveFavoriteList'
    ])
  },
}