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
                <b-dropdown-item-button @click="clickAddUser()">Добавить</b-dropdown-item-button>
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
                <b-dropdown-item-button @click="clickUploadTests()">Добавить</b-dropdown-item-button>
                <b-dropdown-item-button @click="$router.push('tests')">Список тестов</b-dropdown-item-button>
                <b-dropdown-item-button @click="clickReportOtdel()">Отчет по отделу</b-dropdown-item-button>
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

    <!-- Report Otdel modal -->
    <b-modal centered id="reportOtdel_modal" title="Отчет по отделу" @hide="resetReportOtdel">
      <b-form-group
          label="Выберите отдел"
          label-for="input-formatter"
          class="mb-0"
      >
        <b-form-select
            v-model="selReportotdel"
            :options="otdel"
            value-field="id"
            text-field="Name"
            @change="allReportsOtdel()"
        ></b-form-select>
      </b-form-group>
      <b-form-group
          label="Список доступных отчетов"
          label-for="input-formatter"
          class="mb-0 mt-3"
          v-if="reportsForOtdel.length >0"
      >
        <b-list-group>
          <b-list-group-item
              button v-for="report in reportsForOtdel"
              class="mt-2"
              :key="report.id"
              @click="getReportOtdel(report.kvartal, report.year)"
          >{{report.kvartal}} квартал {{report.year}} года</b-list-group-item>
        </b-list-group>
      </b-form-group>
    </b-modal>

    <!-- Upload test modal -->
    <b-modal centered :id="testupload.id" hide-footer title="Загрузка нового теста" @hide="resetUploadModal">
      <b-alert
          class="mb-3"
          v-if="alert !== ''"
          show
          :variant="alert"
      >
        {{alertMessage}}
      </b-alert>
      <b-form-group
          label="Название теста"
          label-for="input-formatter"
          class="mb-0"
      >
        <b-form-input
            :state="Boolean(testupload.name_test)"
            id="name_test"
            v-model="testupload.name_test"
            placeholder="Введите название теста"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Описание теста"
          label-for="input-formatter"
          class="mb-0 mt-3"
      >
        <b-form-textarea
            id="descr_text"
            v-model="testupload.descr_text"
            placeholder="Введите описание теста"
            rows="3"
            max-rows="3"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
          label="Ответсвенный"
          label-for="input-formatter"
          class="mb-0 mt-3"
          description="Вводите строго в формате Иванов И.И."
      >
        <b-form-input
            :state="Boolean(testupload.otvetstv)"
            id="otvetstv"
            v-model="testupload.otvetstv"
            placeholder="Введите ответственного"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Должность"
          label-for="input-formatter"
          class="mb-0 mt-3"
      >
        <b-form-input
            :state="Boolean(testupload.dolch_otvetstv)"
            id="dolch_otvetstv"
            v-model="testupload.dolch_otvetstv"
            placeholder="Введите должность ответственного"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Отдел"
          label-for="input-formatter"
          class="mb-0 mt-3"
      >
        <b-form-select
            :state="Boolean(testupload.depart)"
            v-model="testupload.depart"
            :options="otdel"
            value-field="id"
            text-field="Name"
        ></b-form-select>
      </b-form-group>
      <b-form-group
          label="Дата сдачи"
          label-for="input-formatter"
          class="mb-0 mt-3"
      >
        <b-form-input
            id="deadline"
            type="date"
            v-model="testupload.deadline"
            :state="Boolean(testupload.deadline)"
            class="mb-2"></b-form-input>
      </b-form-group>
      <b-form-group
          label="Файл"
          label-for="input-formatter"
          class="mb-0 mt-3"
      >
        <b-form-file
            multiple
            :state="Boolean(testupload.files)"
            placeholder="Выберите файл"
            drop-placeholder="Перетащите файл"
            accept=".xls, .xlsx"
            @change="handleFileUpload( $event )"
        ></b-form-file>
      </b-form-group>
      <b-button class="mt-4" v-if="Boolean(checker())" variant="success" block @click="uploadTest()">Загрузить</b-button>
    </b-modal>

    <!-- Add USER test modal -->
    <b-modal centered id="adduser" hide-footer title="Добавление пользователя" @hide="resetAddUserModal">
      <b-alert
          class="mb-3"
          v-if="alert !== ''"
          show
          :variant="alert"
      >
        {{alertMessage}}
      </b-alert>
      <b-form-group
          label="Фамилия"
          label-for="input-formatter"
          class="mb-0"
      >
        <b-form-input
            :state="Boolean(addUser.f)"
            id="uf"
            v-model="addUser.f"
            placeholder="Введите фамилию"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Имя"
          label-for="input-formatter"
          class="mb-0 mt-3"
      >
        <b-form-input
            id="un"
            :state="Boolean(addUser.i)"
            v-model="addUser.i"
            placeholder="Введите имя"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Отчество"
          label-for="input-formatter"
          class="mb-0 mt-3"
      >
        <b-form-input
            :state="Boolean(addUser.o)"
            id="uo"
            v-model="addUser.o"
            placeholder="Введите ответственного"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          label="Телефон"
          label-for="input-formatter"
          class="mb-0 mt-3"
      >
        <b-form-input
            :state="Boolean(addUser.t)"
            id="ut"
            v-model="addUser.t"
            placeholder="Введите телефон"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          label="Отдел"
          label-for="input-formatter"
          class="mb-0 mt-3"
      >
        <b-form-select
            :state="Boolean(addUser.d)"
            v-model="addUser.d"
            :options="otdel"
            value-field="id"
            text-field="Name"
        ></b-form-select>
      </b-form-group>

      <b-form-group
          label="Профессия"
          label-for="input-formatter"
          class="mb-0 mt-3"
      >
        <b-form-input
            :state="Boolean(addUser.p)"
            id="ut"
            v-model="addUser.p"
            placeholder="Введите профессию"
        ></b-form-input>
      </b-form-group>

      <b-button class="mt-4" v-if="Boolean(checkerU())" variant="success" block @click="newUser()">Создать</b-button>
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
      addUser:{
        f:'',
        i:'',
        o:'',
        d:'',
        t:'',
        p:''
      },
      testupload:{
        name_test:'',
        otvetstv:'',
        dolch_otvetstv:'',
        deadline:'',
        files:null,
        descr_text:'',
        depart:'',
        id: 'test-upload'
      },
      roles:[
        {id: 1, Name: 'Администратор'},
        {id: 2, Name: 'Пользователь'}
      ],
      selected :'',
      showDate: new Date(),
      events: [],
      statistics: [],
      show: false,
      label: 'Обрабатывем данные...',
      otdel:[],
      selReportotdel:'',
      reportsForOtdel: [],
      alert:'',
      alertMessage:'',

  }),
  methods: {
    newUser(){
      axios({
        url: 'http://194.87.101.58/json/adduser',
        method: 'POST',
        params: {
          f: this.addUser.f,
          i: this.addUser.i,
          o: this.addUser.o,
          d: this.addUser.d,
          t: this.addUser.t,
          p: this.addUser.p
        },
      })
          .then((res) => {
            if (res.data[0] === 200) {
              this.$toasted.success(res.data[1], {
                action: {
                  text: 'OK',
                }
              })
              this.resetAddUserModal()
              this.$root.$emit('bv::hide::modal', 'adduser')
            } else {
              this.$root.$emit('bv::hide::modal', 'adduser')
              this.alert = 'danger'
              this.alertMessage = res.data[0]
            }
          })
    },
    checker(){
      return Boolean(this.testupload.files)&&Boolean(this.testupload.name_test)&&Boolean(this.testupload.name_test)&&Boolean(this.testupload.dolch_otvetstv)&&Boolean(this.testupload.deadline)&&Boolean(this.testupload.depart)
    },
    checkerU(){
      return Boolean(this.addUser.p)&&Boolean(this.addUser.f)&&Boolean(this.addUser.i)&&Boolean(this.addUser.o)&&Boolean(this.addUser.d)&&Boolean(this.addUser.t)
    },
    handleFileUpload(){
      this.testupload.files = event.target.files[0];
    },
    uploadTest(){
      //let file = this.testupload.files.$refs.file.files[0];
      let formData = new FormData();
      formData.append('files', this.testupload.files);
      formData.append('name_test', this.testupload.name_test);
      formData.append('otvetstv', this.testupload.otvetstv);
      formData.append('dolch_otvetstv', this.testupload.dolch_otvetstv);
      formData.append('deadline', this.testupload.deadline);
      formData.append('descr_text', this.testupload.descr_text);
      formData.append('depart', this.testupload.depart);
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      axios.post('http://194.87.101.58/json/upload_tests', formData, config)
          .then((res) => {
            if(res.data[1] === 200){
              this.alert = 'success'
              this.alertMessage = res.data[0]
              this.resetUploadModal()
            }
            else{
              this.$root.$emit('bv::hide::modal', 'reportOtdel_modal')

              this.alert = 'danger'
              this.alertMessage = res.data[0]
            }
            this.show = false;
          })
    },
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
    getReportOtdel(kvartal, year){
      this.show = true;
      axios({
        url: 'http://194.87.101.58/json/getreportotdel',
        method: 'GET',
        params: {
          kvartal: kvartal,
          yaer: year,
          id_depart: this.selReportotdel
        },
      })
          .then((res) => {
            this.download(res)
            this.show = false;
          })
    },
    allReportsOtdel(){
      this.show = true;
      axios({
        url: 'http://194.87.101.58/json/getallreportsotdel',
        method: 'GET',
        params: {
          otdel: this.selReportotdel
        },
      })
          .then((res) => {
            this.reportsForOtdel = res.data
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
    clickUploadTests(){
      this.$root.$emit('bv::show::modal', this.testupload.id)
    },
    clickAddUser(){
      this.$root.$emit('bv::show::modal', 'adduser')
    },
    clickReportOtdel(){
      this.$root.$emit('bv::show::modal', 'reportOtdel_modal')
    },
    setShowDate(d) {
      this.showDate = d;
    },
    resetInfoModal() {
      this.calendarModal.title = ''
      this.calendarModal.who = ''
      this.calendarModal.content = ''
    },
    resetReportOtdel() {
      this.selReportotdel = ''
      this.reportsForOtdel = []
    },
    resetUploadModal() {
      this.testupload.name_test = ''
      this.testupload.depart = ''
      this.testupload.otvetstv = ''
      this.testupload.deadline = ''
      this.testupload.dolch_otvetstv = ''
      this.testupload.files = null
      this.testupload.descr_text = ''
    },
    resetAddUserModal(){
      this.addUser.o = ''
      this.addUser.i = ''
      this.addUser.f = ''
      this.addUser.d = ''
      this.addUser.t = ''
      this.addUser.p = ''
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

    axios.get('http://194.87.101.58/login/jsondepart')
        .then(res => {
          this.otdel = res.data;
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
