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
                        <b-button size="sm" class="mr-sm" variant="info" @click="newBooks(row.item)">Добавить</b-button>
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
          <b-list-group-item
              class="d-flex justify-content-between align-items-center"
              button
              v-for="(book, ind) in BookModal.content"
              :key="book.id"
          >
            <b-link @click="getlearning(book.id)" href="#">{{ind + 1}}. {{book.Description.split('/').pop()}}</b-link>
            <b-badge @click="deleteBook(book.id)" variant="danger" v-b-tooltip.hover title="Удалить" pill>X</b-badge>
          </b-list-group-item>

        </b-list-group>
      </b-modal>

      <!-- Upload books modal -->
      <b-modal centered id="booksUpload" hide-footer title="Загрузка методичек к тесту" @hide="resetBooksUploadModal">
        <b-alert
            class="mb-3"
            v-if="alert !== ''"
            show
            :variant="alert"
        >
          {{alertMessage}}
        </b-alert>
        <b-form-group
            label="Выберите файлы"
            label-for="input-formatter"
            class="mb-0"
        >
          <b-form-file
              multiple
              :state="Boolean(booksUpload.files)"
              placeholder="Выберите файл"
              drop-placeholder="Перетащите файл"
              @change="handleFileUpload( $event )"
          ></b-form-file>
        </b-form-group>

        <b-form-group
            label="Выберите файлы"
            label-for="input-formatter"
            class="mb-0 mt-3"
            v-if="Boolean(booksUpload.files)"
        >
          <b-list-group >
            <b-list-group-item
                class="d-flex justify-content-between align-items-center"
                button
                v-for="(book, ind) in booksUpload.files"
                :key="book.size"
            >
              {{ind + 1}}. {{book.name}}
              <b-badge @click="deleteNewBook(ind)" variant="danger" v-b-tooltip.hover title="Удалить" pill>X</b-badge>
            </b-list-group-item>

          </b-list-group>
        </b-form-group>
        <b-button class="mt-4" v-if="Boolean(booksUpload.files)" variant="success" block @click="uploadBooks()">Загрузить</b-button>
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
      alert:'',
      alertMessage:'',
      people: [],
      perPage: 10,
      currentPage: 1,
      filter: null,
      filterOn: [],
      booksUpload: {
        files:'',
        id:'',
        year:'',
        kvartal:'',
        depart:''
      },
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
    uploadBooks(){
      this.show2 = true;
      let formData = new FormData();

      for( var i = 0; i < this.booksUpload.files.length; i++ ){
        let file = this.booksUpload.files[i];
        formData.append('files[]', file);
      }
      //formData.append('files', this.booksUpload.files[0])
      formData.append('test', this.booksUpload.id);
      formData.append('depart', this.booksUpload.depart);
      formData.append('year', this.booksUpload.year);
      formData.append('kvartal', this.booksUpload.kvartal);

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      axios.post('http://194.87.101.58/json/upload_books', formData, config)
          .then((res) => {
            if(res.data[0] === 200){
              this.$toasted.success(res.data[1], {
                action: {
                  text: 'OK',
                }
              })
              this.$root.$emit('bv::hide::modal', 'booksUpload')
              this.resetBooksUploadModal()
              axios.get('http://194.87.101.58/json/LearningFiles')
                  .then(res => {
                    this.books = res.data;
                  })
            }
            else{
              this.$toasted.error(res.data[1], {
                action: {
                  text: 'OK',
                }
              })
            }
            this.show2 = false;
          })
    },
    handleFileUpload(event){
      this.booksUpload.files = event.target.files;
    },
    deleteNewBook(ind){
        this.booksUpload.files.length === 1 ? this.booksUpload.files = '' : this.booksUpload.files.splice(ind,1);
    },
    deleteBook(id){
      axios({
        url: 'http://194.87.101.58/json/deletebook',
        method: 'POST',
        params: {
          id: id
        },
      })
          .then((res) => {
            if (res.data[0] === 200) {
              this.$toasted.success(res.data[1], {
                action: {
                  text: 'OK',
                }
              })
              this.BookModal.content = this.BookModal.content.filter(function( obj ) {
                return obj.id !== id; })
            } else {
              this.$toasted.error('Ошибка удаления!', {
                action: {
                  text: 'OK',
                }
              })
            }
          })
    },
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
    newBooks(item){
      this.booksUpload.id = item.id
      this.booksUpload.year = item.year
      this.booksUpload.kvartal = item.kvartal
      this.booksUpload.depart = item.otdel
      this.$root.$emit('bv::show::modal', 'booksUpload')

    },
    resetBooksUploadModal(){
      this.booksUpload.id = ''
      this.booksUpload.year = ''
      this.booksUpload.kvartal = ''
      this.booksUpload.depart = ''
      this.booksUpload.files = ''
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
    // Получаем список отделов
    axios.get('http://194.87.101.58/login/jsondepart')
        .then(res => {
          this.otdel = res.data;
        })

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

  },
  computed: {
    rows(){
      return this.people.length
    }
  }
};
</script>

<style src="../Dashboard/Dashboard.scss" lang="scss" />
