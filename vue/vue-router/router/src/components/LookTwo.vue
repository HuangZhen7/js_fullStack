<template>
  <div class="look">{{message}}
    <p>接受的参数：{{$route.params.userId}}</p>
  </div>
</template>

<script>
export default {
  name: 'Look',
  data () {
    return {
      message: '瞅你咋地?'
    }
  }
}
</script>
