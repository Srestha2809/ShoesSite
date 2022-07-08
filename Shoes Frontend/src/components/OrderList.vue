<template>
  <div class="text-center">
    <img :src="`cart.png`" width="100" height="100" />
    <div class="text-h5 q-mt-md">Order History</div>
    <div class="text-positive text-h6 q-mt-lg q-mb-lg">
      {{ state.status }}
    </div>
  </div>
  <q-card class="q-ma-sm">
    <q-list highlight>
      <q-item>
        <q-item-section>
          <q-item-label>#</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Date</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-for="order in state.orders"
        :key="order.id"
        @click="selectOrder(order.id)"
      >
        <q-item-section>
          {{ order.id }}
        </q-item-section>

        <q-item-section>
          {{ formatDate(order.dateCreated) }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>

  <q-dialog
    v-model="state.selectedAOrder"
    transition-show="rotate"
    transition-hide="rotate"
  >
    <q-card>
      <q-card-actions align="right">
        <q-btn flat label="X" color="primary" v-close-popup class="text-h5" />
      </q-card-actions>
      <q-card-section class="text-h5 text-center text-primary text-bold col-2">
        Order {{ state.orderDetails[0].orderId }}
      </q-card-section>
      <q-card-section class="text-h7 text-center text-primary text-bold col-2">
        {{ state.orderDetails[0].dateCreated }}
      </q-card-section>
      <q-card-section class="text-center">
        <img :src="`cart.png`" width="100" height="100" />
      </q-card-section>
      <q-list highlight>
        <q-item>
          <q-item-section class="text-h7 text-center text-primary text-bold">
            <q-item-label>Name</q-item-label>
          </q-item-section>
          <q-item-section
            class="text-h7 text-center text-primary text-bold"
            style="margin-left: 40px"
          >
            <q-item-label>Quantities</q-item-label>
          </q-item-section>
          <q-item-section
            class="text-h7 text-center text-primary text-bold"
            style="margin-left: 50px"
          >
            <q-item-label>Extended</q-item-label>
          </q-item-section>
        </q-item>

        <q-list separator>
          <q-item>
            <q-item-section
              class="text-primary text-center text-bold"
              style="word-spacing: 20px"
            >
              S O B
            </q-item-section>
          </q-item>
          <q-item v-for="detail in state.orderDetails" :key="detail.orderId">
            <q-item-section class="text-left col-5" style="font-size: 10px">
              {{ detail.detail.productName }}
            </q-item-section>
            <q-item-section
              class="text-center col-5"
              style="word-spacing: 20px"
            >
              {{ detail.qtySold }} {{ detail.qtyOrdered }}
              {{ detail.qtyBackOrdered }}
            </q-item-section>
            <q-item-section class="text-right">
              {{ formatCurrency(detail.sellingPrice) }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section
              class="text-h7 text-right text-bold"
            ></q-item-section>

            <q-item-section class="text-h7 text-right text-bold"
              >Sub:</q-item-section
            >
            <q-item-section class="text-right"
              >{{ formatCurrency(state.sub) }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section
              class="text-h7 text-right text-bold"
            ></q-item-section>

            <q-item-section
              class="text-h7 text-left text-bold"
              style="margin-right: -50px"
              >Tax(13%):
            </q-item-section>
            <q-item-section class="text-right"
              >{{ formatCurrency(state.tax) }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section
              class="text-h7 text-right text-bold"
            ></q-item-section>
            <q-item-section class="text-h7 text-right text-bold text-primary"
              >Total:
            </q-item-section>
            <q-item-section class="text-right text-bold text-primary"
              >{{ formatCurrency(state.sub + state.tax) }}
            </q-item-section>
          </q-item>
          <q-item-section class="text-center text-primary"
            >{{ state.dialogStatus }} {{ state.orderDetails[0].orderId }}
          </q-item-section>
        </q-list>
      </q-list>
    </q-card>
  </q-dialog>
</template>
<script>
import { reactive, onMounted } from "vue";
import { fetcher } from "../utils/apiutil";
import { formatDate } from "../utils/formatutils";
import { formatCurrency } from "../utils/formatutils";

export default {
  setup() {
    let state = reactive({
      status: "",
      orders: [],
      dialogStatus: "",
      selectedAOrder: false,
      orderDetails: [],
      orderSelected: {
        id: 0,
        orderAmount: 0,
        orderLineItems: [
          {
            id: 0,
            qtySold: 0,
            qtyOnBackOrdered: 0,
            qtyOrdered: 0,
            productId: "",
            SellingPrice: 0,
          },
        ],
      },
      sub: 0,
      tax: 0,
    });
    onMounted(() => {
      loadOrders();
    });
    const loadOrders = async () => {
      try {
        let customer = JSON.parse(sessionStorage.getItem("customer"));
        const payload = await fetcher(`order/${customer.email}`);
        if (payload.error === undefined) {
          state.orders = payload;
          state.status = `loaded ${state.orders.length} orders`;
        } else {
          state.status = payload.error;
        }
      } catch (err) {
        console.log(err);
        state.status = `Error has occured: ${err.message}`;
      }
    };
    const selectOrder = async (orderId) => {
      try {
        let customer = JSON.parse(sessionStorage.getItem("customer"));
        const payload = await fetcher(`order/${orderId}/${customer.email}`);
        state.orderDetails = payload;
        state.dialogStatus = `details for order `;
        state.selectedAOrder = true;
        state.orderSelected = state.orders.find(
          (order) => order.id === orderId
        );
        state.orderDetails.forEach((detail) => {
          if (detail.qtySold == 0) {
            state.sub == 0;
          } else {
            state.sub += detail.sellingPrice;
          }
          state.tax += detail.sellingPrice * 0.13;
        });
      } catch (err) {
        console.log(err);
        state.status = `Error has occured: ${err.message}`;
      }
    };
    return {
      state,
      formatDate,
      selectOrder,
      formatCurrency,
    };
  },
};
</script>
