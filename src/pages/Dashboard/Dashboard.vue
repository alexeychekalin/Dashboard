<template>
  <div class="dashboard-page">
    <loading
        :show="show"
        :label="label">
    </loading>
    <h1 class="page-title">Панель управления</h1>
    <b-row>
      <b-col xs="12" lg="6" xl="4" >
        <div class="mb-xlg">
          <Widget
              class="h-100"
              bodyClass="p-0 mt-0"
          >
            <div class="d-flex justify-content-between flex-wrap px-4">
              <h4 class='d-flex align-items-center pb-1'>
                <i class="la la-user la-lg pr-sm text-primary"/>
                Пользователи
              </h4>
              <b-dropdown text="Действия" variant="default" size="sm">
                <b-dropdown-item-button @click="changeText('Daily')">Добавить</b-dropdown-item-button>
                <b-dropdown-item-button @click="changeText('Weekly')">Пакетная загрузка</b-dropdown-item-button>
                <b-dropdown-item-button @click="$router.push('users')">Список пользователей</b-dropdown-item-button>
                <b-dropdown-item-button @click="changeText('Daily')">Управление адмнистраторами</b-dropdown-item-button>
                <b-dropdown-item-button @click="registered()">Отчет по зарегистрированным</b-dropdown-item-button>
              </b-dropdown>
            </div>
            <div class="px-5">
              <h4 class="fw-semi-bold mb-sm mt-sm">{{statistics.ReigstUsers + statistics.DontReigstUsers}}</h4>
              <div class="d-flex">
                <div class="w-50 py-3 pr-2">
                  <div class="d-flex align-items-start">
                    <h6>{{statistics.ReigstUsers}}</h6>
                    <i class="la la-send la-lg ml-sm text-success"/>
                  </div>
                  <p class="text-muted mb-0 mr"><small>Зарегистрировались</small></p>
                </div>
                <div class="w-50 py-3 pl-2">
                  <div class="d-flex align-items-start">
                    <h6>{{statistics.DontReigstUsers}}</h6>
                    <i class="la la-warning la-lg ml-sm text-warning"/>
                  </div>
                  <p class="text-muted mb-0 mr"><small>Не запускали бота</small></p>
                </div>
                <div class="w-50 py-3 pl-2">
                  <div class="d-flex align-items-start">
                    <h6>{{statistics.TodayTestDone}}</h6>
                    <i class="la la-thumbs-up la-lg ml-sm text-success"/>
                  </div>
                  <p class="text-muted mb-0 mr"><small>Прошли тест сегодня</small></p>
                </div>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
      <b-col xs="12" lg="6" xl="4" >
        <div class="mb-xlg">
          <Widget
              class="h-100"
              bodyClass="p-0 mt-0"
          >
            <div class="d-flex justify-content-between flex-wrap px-4">
              <h4 class='d-flex align-items-center pb-1'>
                <i class="la la-list-alt la-lg pr-sm text-primary"/>
                Тесты
              </h4>
              <b-dropdown text="Действия" variant="default" size="sm">
                <b-dropdown-item-button @click="changeText('Daily')">Добавить</b-dropdown-item-button>
                <b-dropdown-item-button @click="$router.push('tests')">Список тестов</b-dropdown-item-button>
              </b-dropdown>
            </div>
            <div class="px-5">
              <h4 class="fw-semi-bold mb-sm mt-sm">{{statistics.CountOrdinaryTests + statistics.CountEnterTests + statistics.CountExistsTests}}</h4>
              <div class="d-flex">
                <div class="w-50 py-3 pr-2">
                  <div class="d-flex align-items-start">
                    <h6>{{statistics.CountOrdinaryTests}}</h6>
                    <i class="la la-question-circle la-lg ml-sm text-success"/>
                  </div>
                  <p class="text-muted mb-0 mr"><small>Рабочих тестов</small></p>
                </div>
                <div class="w-50 py-3 pl-2">
                  <div class="d-flex align-items-start">
                    <h6>{{statistics.CountEnterTests}}</h6>
                    <i class="la la-upload la-lg ml-sm text-warning"/>
                  </div>
                  <p class="text-muted mb-0 mr"><small>Входных тестов</small></p>
                </div>
                <div class="w-50 py-3 pl-2">
                  <div class="d-flex align-items-start">
                    <h6>{{statistics.CountExistsTests}}</h6>
                    <i class="la la-download la-lg ml-sm text-danger"/>
                  </div>
                  <p class="text-muted mb-0 mr"><small>Выходных тестов</small></p>
                </div>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
      <b-col xs="12" lg="6" xl="4" >
        <div class="mb-xlg">
          <Widget
              class="h-100"
              bodyClass="p-0 mt-0"
          >
            <div class="d-flex justify-content-between flex-wrap px-4">
              <h4 class='d-flex align-items-center pb-1'>
                <i class="la la-book-reader la-lg pr-sm text-primary"/>
                Методички
              </h4>
              <b-dropdown text="Действия" variant="default" size="sm">
                <b-dropdown-item-button @click="$router.push('tests')">Список</b-dropdown-item-button>
              </b-dropdown>
            </div>
            <div class="px-5">
              <h4 class="fw-semi-bold mb-sm mt-sm">{{statistics.CountWithMat + statistics.DontCountWithMat}}</h4>
              <div class="d-flex">
                <div class="w-50 py-3 pr-2">
                  <div class="d-flex align-items-start">
                    <h6>{{statistics.CountWithMat}}</h6>
                    <i class="la la-book-open la-lg ml-sm text-success"/>
                  </div>
                  <p class="text-muted mb-0 mr"><small>с методическими материалами</small></p>
                </div>
                <div class="w-50 py-3 pl-2">
                  <div class="d-flex align-items-start">
                    <h6>{{statistics.DontCountWithMat}}</h6>
                    <i class="la la-book la-lg ml-sm text-warning"/>
                  </div>
                  <p class="text-muted mb-0 mr"><small>без методических материалов</small></p>
                </div>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12">
        <Widget
            bodyClass="widget-table-overflow"
            customHeader
        >
          <div class="d-flex justify-content-between flex-wrap px-4">
            <h4 class='d-flex align-items-center pb-1'>
              <i class="la la-users-cog la-lg pr-sm text-primary"/>
              <b>Расписание тестов</b>
            </h4>
          </div>
          <div class="px-5 pb-5" style="height:700px">
            <calendar-view
                :show-date="showDate"
                :items="events"
                class="theme-default"
                @click-item="clickCalendar($event.originalItem)"
            >
              <calendar-view-header
                  slot="header"
                  slot-scope="t"
                  :header-props="t.headerProps"
                  @input="setShowDate" />
            </calendar-view>
          </div>
        </Widget>
      </b-col>
    </b-row>
    <!-- Info modal -->
    <b-modal centered :id="calendarModal.id" :title="calendarModal.title" ok-only @hide="resetInfoModal">
      <h5 class="m-t-1">Название: </h5>
      <p id="name"> {{calendarModal.content}} </p>
      <h5 class="m-t-1 pt-sm">Ответственный: </h5>
      <p id="name"> {{calendarModal.who}} </p>
    </b-modal>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import loading from 'vue-full-loading'
import { Chart } from 'highcharts-vue';
import axios from "axios";

import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"


export default {
  name: 'Dashboard',
  components: {
    Widget, highcharts: Chart,CalendarView, CalendarViewHeader, loading
  },
  data: () => ({
      calendarModal: {
        id: 'cal-modal',
        title: '',
        content: '',
        who:''
      },
      selected :'',
      showDate: new Date(),
      events: [],
      statistics: [],
      show: false,
      label: 'Обрабатывем данные...'
  }),
  methods: {
    registered(){
      this.show = true;
      axios({
        url: 'http://194.87.101.58/json/selectreport',
        method: 'GET',
        responseType: 'blob', // important
      })
          .then((res) => {
            this.download(res)
            this.show = false;
          })
    },
    download(response){
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      let filename = response.headers['content-disposition'];
      link.setAttribute("download", filename.split('=')[1].replaceAll('"', ''));
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    clickCalendar(e){
      this.calendarModal.title = e.title;
      this.calendarModal.content = e.Description;
      this.calendarModal.who = e.Otvetstv;
      this.$root.$emit('bv::show::modal', this.calendarModal.id)
    },
    setShowDate(d) {
      this.showDate = d;
    },
    resetInfoModal() {
      this.calendarModal.title = ''
      this.calendarModal.who = ''
      this.calendarModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

  },
  mounted() {
    this.show = true;
    // Получаем список дат для календаря
    axios.get('http://194.87.101.58/json/DateNameOtvtstTest')
        .then(res => {
          this.events = res.data;
        })

    axios.get('http://194.87.101.58/json/json_dump_Statistics')
        .then(res => {
          this.statistics = res.data;
        })
    this.show = false;
  },
  computed: {
    rows(){
      return this.people.length
    },
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" />
<style>
.cv-item{
  background-color: #f66;
  color:white;
  cursor:pointer;
}
</style>
