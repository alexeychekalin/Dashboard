<template>
  <div class="dashboard-page">
    <loading
        :show="show2"
        :label="label">
    </loading>
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
                        <b-button size="sm" class="mr-sm" variant="success" @click="show(row.item, row.index, $event.target)">Методички</b-button>
                        <b-button size="sm" class="mr-sm" variant="warning" @click="deleteTest(row.item.id)">Удалить</b-button>
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
      <b-modal centered :id="BookModal.id" :title="BookModal.title" ok-only @hide="resetInfoModal">
        <b-list-group >
          <b-list-group-item button v-for="(book, ind) in BookModal.content" :key="book.id" @click="getlearning(book.id)" >{{ind + 1}}. {{book.Description.split('/').pop()}}</b-list-group-item>
        </b-list-group>
      </b-modal>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import axios from "axios";
import loading from 'vue-full-loading'

export default {
  name: 'Dashboard',
  components: {
    Widget, loading
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
      BookModal:{
        id: 'book-modal',
        title: '',
        content: ''
      },
      otdel:[],
      books:[],
      selected :'',
      show2: false,
      label: 'Обрабатывем данные...'
  }),
  methods: {
    deleteTest(test){
      this.$bvModal.msgBoxConfirm('ВНИМАНИЕ! СИСТЕМА РАБОТАЕТ НА РЕАЛЬНЫХ ДАННЫХ  Вы действительно хотите удалить данный тест? ', {
        title: 'Удаление теста',
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
                url: 'http://194.87.101.58/json/deletetest',
                method: 'POST',
                params: {
                  test: test
                },
              })
                  .then(() => {
                    axios.get('http://194.87.101.58/json/AllTests')
                        .then(res => {
                          this.people = res.data;
                          this.filter = ''
                        })
                  })
            }
          })
    },
    getlearning(id){
      this.show2 = true
      axios({
        url: 'http://194.87.101.58/json/getlearning',
        method: 'GET',
        params: {
          id: id
        },
        responseType: 'blob', // important
      })
          .then((res) => {
            this.download(res)
            this.show2 = false;
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
    show(item, index, button) {
      var t = this.books.filter(x => x.Name_t === item.Name_t && x.year === item.year && x.kvartal === item.kvartal);

      this.selected = item.id;
      this.BookModal.title = item.Name_t;
      this.BookModal.content = t;
      this.$root.$emit('bv::show::modal', this.BookModal.id, button)
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
    axios.get('http://194.87.101.58/json/AllTests')
        .then(res => {
          this.people = res.data;
        })
    // Получаем список методичек
    axios.get('http://194.87.101.58/json/LearningFiles')
        .then(res => {
          this.books = res.data;
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
