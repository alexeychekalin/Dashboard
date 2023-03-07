<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        Белоярское УАВР
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Кабинет администратора</h3>" customHeader>
        <p class="widget-auth-info">
            Используйте телефон для входа
        </p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border" ref="email" required v-model="phone"  name="phone" placeholder="Телефон" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" ref="password" required v-model="password" name="password" placeholder="Пароль" />
          </div>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse">Вход</b-button>
        </form>

      </Widget>
    </b-container>
    <footer class="auth-footer">
      Административная панель системы тестирования в мессенджере Telegram - Сделано командой <a href="https://t.me/edchek" rel="nofollow noopener noreferrer" target="_blank">TeamPack</a>
    </footer>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';

export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      errorMessage: null,
      phone:'',
      password:''
    };
  },
  methods: {
    login() {
      const email = this.$refs.email.value;
      const password = this.$refs.password.value;

      if (email.length !== 0 && password.length !== 0) {
        window.localStorage.setItem('authenticated', true);
        this.$router.push('/app/dashboard');
      }
    },
  },
  created() {

  },
};
</script>
