<template>
  <div class="dashboard-page">

    <h1 class="page-title">Список пользователей</h1>
    <b-row>
        <b-col xs="12">
          <Widget
            bodyClass="widget-table-overflow"
          >
            <div class="d-flex justify-content-between flex-wrap px-4">
              <b-col lg="6" class="mb-lg mt-lg">
                <b-form-group
                    label="Поиск"
                    label-for="filter-input"
                    label-cols-sm="1"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                >
                  <b-input-group size="sm">
                    <b-form-input
                        id="filter-input"
                        v-model="filter"
                        type="search"
                        placeholder="Вводите для поиска"
                    ></b-form-input>

                    <b-input-group-append>
                      <b-button :disabled="!filter" @click="filter = ''">Очистить</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </div>
              <div class="table-responsive">
                <b-table
                    id="my-table"
                    :items="people"
                    :per-page="perPage"
                    :current-page="currentPage"
                    class="table table-striped table-lg mb-0 requests-table"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    @filtered="onFiltered"
                    :fields="fields"
                >
                  <template #cell(actions)="row">
                    <div>
                        <b-button
                            size="sm"
                            class="mr-sm"
                            @click="getreports(row.item, row.index, $event.target)"
                            variant="primary"
                        >Отчеты</b-button>
                        <b-overlay
                            :show="busy"
                            rounded
                            opacity="0.6"
                            spinner-small
                            spinner-variant="primary"
                            class="d-inline-block"
                        >
                          <b-button
                              :disabled="busy"
                              size="sm"
                              class="mr-sm"
                              variant="success"
                              :id="'myid-'+row.item.id"
                              @click="result(row.item)"
                          >Результат
                          </b-button>
                        </b-overlay>

                        <b-button
                            size="sm"
                            class="mr-sm"
                            variant="warning"
                            @click="edit(row.item, row.index, $event.target)"
                        >Изменить
                        </b-button>

                        <b-button
                            size="sm"
                            variant="danger"
                            @click="deleteUser(row.item)"
                        >Удалить
                        </b-button>
                    </div>
                  </template>
                </b-table>

            </div>
            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                first-text="⏮"
                prev-text="⏪"
                next-text="⏩"
                last-text="⏭"
                class="mt-4"
            ></b-pagination>

          </Widget>
        </b-col>
      </b-row>
      <!-- Info modal -->
      <b-modal centered :id="infoModal.id" :title="infoModal.title" hide-footer @hide="resetInfoModal">
        <label for="input-live">ФИО:</label>
        <b-form-input disabled id="name" v-model="infoModal.content.ФИО" placeholder="Enter your name"></b-form-input>
        <label for="input-live">Отдел:</label>
        <b-form-select
            v-model="selected"
            :options="otdel"
            value-field="id"
            text-field="Name"
        ></b-form-select>
        <label for="input-live">Профессия:</label>
        <b-form-input id="profession" v-model="infoModal.content.Профессия" placeholder="Enter your name"></b-form-input>
        <b-button class="mt-4"  variant="success" block @click="editUser(selected, infoModal.content.Профессия, infoModal.content.id)">Обновить</b-button>
      </b-modal>

      <!-- Repots modal -->
      <b-modal centered :id="RepModal.id" title="Список пройденных тестов" ok-only @hide="resetInfoModal">
        <b-list-group >
          <b-list-group-item button v-for="report in RepModal.content" :key="report.id" @click="getreport(report, selected)" >{{report.Name_t }} (  {{report.kvartal}} квартал {{report.year}} года) </b-list-group-item>
        </b-list-group>

      </b-modal>

    <!-- Popover for SET MARK -->
    <b-popover
        :target="idResultShow"
        triggers="click"
        :show.sync="popoverShow"
        placement="auto"
        container="my-container"
        ref="popover"
        style="min-width: 300px"
    >
      <template #title>
        Установить результат
      </template>

      <div>

        <b-form-group
            label="Квартал/Год"
            label-for="popover-input-2"
            label-cols-sm="4"
            label-align-sm="right"
            class="mb-2"
            style=""
            v-slot="{ ariaDescribedby }"
            invalid-feedback="Заполните все поля"
        >
          <b-form-select
              id="popover-input-2"
              v-model="kvartal"
              style="width: 50%"
              :options="[1, 2, 3, 4]"
              :aria-describedby="ariaDescribedby"
              @change="getTestForMark()"
          ></b-form-select>
          <b-form-select
              :disabled="!Boolean(kvartal)"
              style="width: 50%"
              id="popover-input-3"
              v-model="year"
              :options="[2022, 2023, 2024, 2025]"
              :aria-describedby="ariaDescribedby"
              @change="getTestForMark()"
          ></b-form-select>
        </b-form-group>

        <b-form-group
            label="Тест"
            label-for="input-formatter"
            class="mb-2"
            label-cols="3"
            v-if="testsForMark.length > 0"
        >
          <b-form-select
              v-model="testMark"
              :options="testsForMark"
              value-field="id"
              text-field="Name_t"
              :state="Boolean(testMark)"
          ></b-form-select>
        </b-form-group>

        <b-form-group
            v-if="testsForMark.length > 0"
            label="Оценка"
            label-for="popover-input-1"
            label-cols="3"
            class="mb-1"
        >
          <b-form-input
              ref="input1"
              id="popover-input-1"
              size="sm"
              :state="Boolean(mark)"
              v-model="mark"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            v-if="testsForMark.length > 0"
            label="Дата"
            label-for="popover-input-2"
            label-cols="3"
            :state="Boolean(markDate)"
            class="mb-1"
            invalid-feedback="Заполните поле"
        >
          <b-form-input
              type="date"
              id="popover-input-2"
              v-model="markDate"
              :state="Boolean(markDate)"
              size="sm"
          ></b-form-input>
        </b-form-group>

        <b-button @click="onClose" size="sm mr-2" variant="danger">Отмена</b-button>
        <b-button v-if="testsForMark.length > 0" @click="onOk" size="sm" variant="primary">Записать</b-button>
      </div>
    </b-popover>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';

import axios from "axios";

import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"


export default {
  name: 'Dashboard',
  components: {
    Widget, CalendarView, CalendarViewHeader
  },
  data: () => ({
      people: [],
      perPage: 10,
      selected :'',
      currentPage: 1,
      filter: null,
      filterOn: [],
      fields: [
        { key: 'ФИО', sortable: true },
        { key: 'Отдел', sortable: true },
        { key: 'Роль', sortable: true },
        { key: 'Телефон', sortable: true },
        { key: 'ChatID', sortable: true },
        { key: 'actions', label: 'Действия', sortable: false },
      ],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      otdel:[],
      reports:[],
      RepModal:{
        id: 'rep-modal',
        content: ''
      },
      isSetResult: false,
      popoverShow: false,
      idResultShow: '',
      mark:'',
      markDate: '',
      kvartal: '',
      year: '',
      otdelMark:'',
      testMark:'',
      busy: false,
      testsForMark:[],
      phone: ''
  }),
  methods: {
    editUser(otdel, prof, id){
      axios({
        url: 'http://194.87.101.58/json/edituser',
        method: 'POST',
        params: {
          otdel: otdel,
          prof: prof,
          id: id
        },
      })
          .then((res) => {
            if(res.data[0] === 200){
              this.$toasted.success('Пользователь успешно обновлен!', {
                action: {
                  text: 'OK',
                }
              })
            }
            else{
              this.$toasted.error('Ошибка при обновлении пользователя!', {
                action: {
                  text: 'OK',
                }
              })
            }

          })
    },
    deleteUser(item){
      this.$bvModal.msgBoxConfirm('ВНИМАНИЕ! СИСТЕМА РАБОТАЕТ НА РЕАЛЬНЫХ ДАННЫХ  Вы действительно хотите удалить пользователя? ', {
      title: 'Удаление пользователя',
      okVariant: 'danger',
      okTitle: 'ДА',
      cancelTitle: 'НЕТ',
      footerClass: 'p-2',
      hideHeaderClose: false,
      centered: true
    })
        .then(value => {
          if(value){
            axios({
              url: 'http://194.87.101.58/json/deleteuser',
              method: 'POST',
              params: {
                chatid: item.ChatID,
                id: item.id
              },
            })
            .then(() => {
              this.$root.$emit('bv::hide::modal', this.infoModal.id)
              this.$toasted.success('Пользователю успешно добавлена оценка!', {
                action: {
                  text: 'OK',
                }
              })
            })
          }
        })
    },
    getTestForMark(){
      if(this.year === '') return;
      else{
        axios({
          url: 'http://194.87.101.58/json/testsForMark',
          method: 'GET',
          params: {
            kvartal: this.kvartal,
            year: this.year,
            otdel: this.otdelMark
          },
        })
            .then((res) => {
              this.testsForMark = res.data;
              // this.show2 = false;
            })
      }
    },
    onOk(){
      axios({
        url: 'http://194.87.101.58/json/SetMark',
        method: 'POST',
        params: {
          peoples: this.phone,
          tests: this.testMark,
          deadline: this.markDate,
          mark: this.mark
        },
      })
          .then((res) => {
            if(res.data[0] === 200){
              this.$bvToast.toast('Пользователю успешно добавлена оценка', {
                title: 'Оценка установлена',
                variant: 'success',
                solid: true
              })
              this.popoverShow = false
            }
            else{
              this.$bvToast.toast(res.data[1], {
                title: 'Ошибка',
                variant: 'success',
                solid: true
              })
            }

          })
    },
    onClose() {
      this.popoverShow = false
    },
    result(item){
      this.busy = true
      this.popoverShow = false
      this.mark = ''
      this.markDate = ''
      this.idResultShow = "myid-"+item.id
      this.otdelMark = item.IdDepart
      this.phone = item.Телефон
      setTimeout(() => {
        this.popoverShow = true
        // this.show2 = false;
        this.busy = false
      }, 300)
    },
    SetResult(id){
      this.idResultShow = "listGroup-" +id
      this.popoverShow = true;
    },
    getreports(item, index, button){
      //this.show2 = true
      axios({
        url: 'http://194.87.101.58/json/getallreports',
        method: 'GET',
        params: {
          chatid: item.ChatID
        },
      })
          .then((res) => {
            this.RepModal.content = res.data;
           // this.show2 = false;
          })
      //console.log(this.RepModal)
      this.selected = item.id;
      this.RepModal.title = item.Name_t;
      //this.BookModal.content = t;
      this.$root.$emit('bv::show::modal', this.RepModal.id, button)
    },
    getreport(item, user){
      //this.show2 = true
      axios({
        url: 'http://194.87.101.58/json/getreport',
        method: 'post',
        params: {
          year: item.year,
          kvartal: item.kvartal,
          id: user,
          depart: item.otdel
        },
        responseType: 'blob', // important
      })
          .then((res) => {
            this.download(res)
            //this.show2 = false;
          })
      //console.log(this.RepModal)
      this.selected = item.id;
      this.RepModal.title = item.Name_t;
      //this.BookModal.content = t;
      this.$root.$emit('bv::show::modal', this.RepModal.id)
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
    edit(item, index, button) {
      this.selected = item.IdDepart;
      this.infoModal.title = item.ФИО;
      this.infoModal.content = item;
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
      this.isSetResult = false
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  mounted() {
    // Получаем список пользователей
    axios.get('http://194.87.101.58/login/json')
        .then(res => {
          this.people = res.data;
        })
    // Получаем список отделов
    axios.get('http://194.87.101.58/login/jsondepart')
        .then(res => {
          this.otdel = res.data;
        })
  },
  computed: {
    rows(){
      return this.people.length
    },
  }
};
</script>

<style src="../Dashboard/Dashboard.scss" lang="scss" />