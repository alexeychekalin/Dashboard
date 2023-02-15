<template>
  <div class="dashboard-page">
    <h1 class="page-title">Список тестов</h1>
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
                    class="table table-striped table-striped table-lg mb-0 requests-table"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    @filtered="onFiltered"
                    :fields="fields"
                >
                  <template #cell(actions)="row">
                    <div>
                        <b-button size="sm" class="mr-sm" variant="primary">Удалить</b-button>
                        <b-button size="sm" class="mr-sm" variant="warning" @click="edit(row.item, row.index, $event.target)">Результат</b-button>
                    </div>
                  </template>
                  <template #cell(otdelNew)="row2">
                    <div>
                     {{otdel.find(e => e.id === row2.item.otdel).Name}}
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
      <b-modal centered :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <label for="input-live">ФИО:</label>
        <b-form-input id="name" v-model="infoModal.content.ФИО" placeholder="Enter your name"></b-form-input>
        <label for="input-live">Отдел:</label>
        <b-form-select
            v-model="selected"
            :options="otdel"
            value-field="id"
            text-field="Name"
        ></b-form-select>
        <label for="input-live">Профессия:</label>
        <b-form-input id="profession" v-model="infoModal.content.Профессия" placeholder="Enter your name"></b-form-input>
      </b-modal>
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
      currentPage: 1,
      filter: null,
      filterOn: [],
      fields: [
        { key: 'Name_t', label:'Название', sortable: true },
        { key: 'otdelNew', label:'Отдел', sortable: true },
        { key: 'kvartal', label:'Квартал', sortable: true },
        { key: 'year', label:'Год', sortable: true },
        { key: 'DeadLine', label:'Начало', sortable: true },
        { key: 'actions', label: 'Действия', sortable: false }
      ],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      otdel:[],
      selected :'',
  }),
  methods: {
    edit(item, index, button) {
      this.selected = item.IdDepart;
      this.infoModal.title = item.ФИО;
      this.infoModal.content = item;
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
  mounted() {
    // Получаем список тестов
    axios.get('http://194.87.101.58/json/LearningFiles')
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
    }
  }
};
</script>

<style src="../Dashboard/Dashboard.scss" lang="scss" />
