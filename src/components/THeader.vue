<template>
  <header>
    <div class="left">
      <a href class="btn btn-icon">
        <i class="icon icon-home"></i>
      </a>
      <a href class="btn btn-icon">
        <i class="icon icon-board"></i>
        <span class="txt">看板</span>
      </a>
    
    </div>
    <a href="/" class="logo"></a>
    <div class="right">
      <a href class="btn btn-icon">
        <i class="icon icon-add"></i>
      </a>
      <t-popup :title="user.name">       
          <button class="avatar">
            <span>{{user.name[0]}}</span>
          </button>
          <t-popup-menu slot="content" :items="popupitems" @command="execute"></t-popup-menu>
      </t-popup>
    </div>
  </header>
</template>
<script>
import TPopup from "@/components/TPopup";
import TPopupMenu from "@/components/TPopupMenu";
import {mapState} from 'vuex'
export default {
  name: "THeader",
  components: {
    TPopup,
    TPopupMenu
  },
  data() {
    return {
      popupitems: [
        {name:'退出', command: 'logout'},
        {name:'详情', command: 'detile'},

      ]
    }
  },
  computed: {
      ...mapState('user', {
        user: state => state.info
      })
  },
  methods: {
    execute(e) {
      switch(e){
        case 'logout':
          this.logout();
          break;
        case 'detile':
          this.detile();
          break;
        default: 
          break;
      }
    },
    logout() {
      this.$store.dispatch('user/logout');
      this.$router.push({name: 'Login'})
    },
    detile() {
      console.log('detile');
    }
  }
};
</script>