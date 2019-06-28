<template>
  <el-dropdown trigger="click" @command="handleSetLanguage">
    <el-button
    size="mini"
    >
      {{ language }}<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
      <el-dropdown-item :disabled="language==='ru'" command="ru">Русский</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data () {
    return {
      language: this.$initLang
    }
  },
  methods: {
    handleSetLanguage (lang) {
      this.$i18n.locale = lang
      this.language = lang
      this.$message({
        message: this.$t('switch_lang_ok'),
        type: 'success'
      })
    }
  }
}
</script>
