<template>
  <div class="form-wrapper">
    <p>※設定はこのデバイスのみに保存されます。</p>
    <v-form v-model="valid">
      <h3>設定</h3>
        <!-- Auth Token -->
        <v-text-field
        label="パスワード"
        v-model="settings.authToken"
        :counter="150"
        :rules="[stringRule]"
        />
        <!-- カラー -->
        <v-select
        :items="color"
        v-model="settings.color"
        label="カラーテーマ"
        ></v-select>
      <v-row class="mt-4">
        <v-spacer/>
        <v-btn color="primary" :disabled="!valid" @click="onClickSave">保存</v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    const createItems = v => v.split(',').map(v => v.trim()).filter(v => v.length !== 0)
    const itemMaxLength = v => createItems(v).reduce((a, c) => Math.max(a, c.length), 0)
    return {
      /** 入力したデータが有効かどうか */
      valid: false,
      /** 設定 */
      settings: { ...this.$store.state.settings },
      color: ['green', 'blue', 'indigo', 'teal', 'lime', 'pink'],
      /** バリデーションルール */
      appNameRule: v => v.length <= 30 || '30文字以内で入力してください',
      stringRule: v => v.length <= 150 || '150文字以内で入力してください',
      categoryRules: [
        v => createItems(v).length !== 0 || 'カテゴリは1つ以上必要です',
        v => itemMaxLength(v) <= 4 || '各カテゴリは4文字以内で入力してください'
      ],
      tagRule: v => itemMaxLength(v) <= 4 || '各タグは4文字以内で入力してください'
    }
  },
  methods: {
    /** 保存ボタンがクリックされたとき */
    onClickSave () {
      this.$store.dispatch('saveSettings', { settings: this.settings })
    }
  }
}
</script>

<style>
.form-wrapper {
  max-width: 500px;
  margin: auto;
}
</style>