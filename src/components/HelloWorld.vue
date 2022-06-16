<template>
<v-container>
   <v-data-table
    :headers="dessertHeaders"
    :items="response"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    class="elevation-1"
  >
  <!-- eslint-disable-next-line -->
  <template v-slot:item.birthday="{ item }">
    {{format(item.birthday)}}
  </template>
  <!-- eslint-disable-next-line -->
  <template v-slot:item.avatar="{ item }">
    <v-avatar>
      <img
        :src= "`${item.avatar}`"
        alt="John"
      >
    </v-avatar>
  </template>
  <!-- eslint-disable-next-line -->
      <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
        <v-icon
          @click="
            expand(true);
            get_chekin(item.id);
          "
          v-if="!isExpanded"
          >mdi-chevron-down</v-icon
        >
        <v-icon @click="expand(false)" v-if="isExpanded">mdi-chevron-up</v-icon>
      </template>
      <template v-slot:expanded-item="{ headers,  }">
      <td :colspan="headers.length">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  location
                </th>
                <th class="text-left">
                  purpose
                </th>
                <th class="text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="thing in chekin" :key="thing.id">
              <td>{{thing.location}}</td>
              <td>{{thing.purpose}}</td>
              <td>{{format(thing.checkin)}}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </td>
      </template>
  </v-data-table>
</v-container>
</template>

<script>
import Util from "@/js/Util";
import employees_db from "@/js/database/fetch_data";
  export default {
    name: 'HelloWorld',

    data () {
      return {
        response: [],
        chekin:[],
        expanded: [],
        singleExpand: true,
        dessertHeaders: [
          {
            text: 'name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'avatar', value: 'avatar' },
          { text: 'email', value: 'email' },
          { text: 'phone', value: 'phone' },
          { text: 'department', value: 'department' },
          { text: 'birthday', value: 'birthday' },
          { text: 'country', value: 'country' },
          { text: '', value: 'data-table-expand' },
        ],
      }
      },
      mounted: async function () {
        this.load();
      },
      methods: {
        load:async function(){
          this.response = await employees_db.updateScreen();
        },
      format(date){
        return Util.format_date(date)
      },
      get_chekin:async function(id){
        this.chekin = []
        this.chekin =  await employees_db.getchekin(id);
      }
      }
      
  }
</script>
<style>
.avatar {
  border-radius: 30%;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 12px !important;
  font-family: Tahoma, Verdana, sans-serif;
}
</style>
