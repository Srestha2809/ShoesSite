<template>
  <div class="text-center">
    <div class="text-h4 q-mt-md">Cart Contents</div>
    <img :src="`cart.png`" width="100" height="100" />
    <div class="text-h6 text-positive">{{ state.status }}</div>
  </div>
  <div
    v-if="state.cart.length > 0"
    style="width: 90vw; margin-left: 5vw; margin-top: 1vh"
  >
    <div>
      <q-scroll-area style="height: 55vh">
        <q-card class="q-ma-md">
          <q-list separator>
            <q-item style="bottom: 1vh">
              <q-item-section class="col-2 text-bold text-center text-red-8"
                >Name</q-item-section
              >
              <q-item-section class="col-4 text-bold text-center text-red-8"
                >QTY</q-item-section
              >

              <q-item-section class="col-2 text-bold text-center text-red-8"
                >MSRP</q-item-section
              >
              <q-item-section class="col-3 text-bold text-center text-red-8"
                >EXTENDED</q-item-section
              >
            </q-item>
            <q-item v-for="item in state.cart" :key="item.id" clickable>
              <q-item-section class="text-left col-4">
                {{ item.item.productName }}
              </q-item-section>
              <q-item-section class="text-left col-1">
                {{ item.qty }}
              </q-item-section>

              <q-item-section class="text-right col-3">
                {{ formatCurrency(item.item.msrp) }}
              </q-item-section>
              <q-item-section class="text-right col-3">
                {{ formatCurrency(item.item.msrp * item.qty) }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="col-8 text-right text-bold"
                >Sub:</q-item-section
              >
              <q-item-section class="text-right col-4 q-pr-md">{{
                formatCurrency(state.subTotal)
              }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="col-8 text-right text-bold"
                >Tax(13%):</q-item-section
              >
              <q-item-section class="text-right col-4 q-pr-md">
                {{ formatCurrency(state.tax) }}</q-item-section
              ></q-item
            >
            <q-item>
              <q-item-section class="col-8 text-right text-red-8 text-bold"
                >Total:</q-item-section
              >
              <q-item-section
                class="text-right text-bold text-red-8 col-4 q-pr-md"
              >
                {{ formatCurrency(state.cartTotal) }}</q-item-section
              ></q-item
            >
          </q-list>
        </q-card>
      </q-scroll-area>
      <div class="text-center q-mt-md q-mb-lg">
        <q-btn color="primary" label="Clear cart" @click="clearcart()" />
        <q-btn
          class="q-mr-sm"
          color="primary"
          label="Save Order"
          :disable="state.cart.length < 1"
          @click="saveCart()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
import { formatCurrency } from "../utils/formatutils";
import { poster } from "../utils/apiutil";

export default {
  setup() {
    let state = reactive({
      status: "",
      totalQty: 0,
      subTotal: 0,
      tax: 0,
      cartTotal: 0,
      cart: [],
    });
    onMounted(() => {
      if (sessionStorage.getItem("cart")) {
        state.cart = JSON.parse(sessionStorage.getItem("cart"));
        state.cart.forEach((item) => {
          state.totalQty += item.qty;
          state.subTotal += item.item.msrp * item.qty;
          state.tax = state.subTotal * 0.13;
          state.cartTotal = state.tax + state.subTotal;
        });
      } else {
        state.cart = [];
      }
    });

    const saveCart = async () => {
      let customer = JSON.parse(sessionStorage.getItem("customer"));
      let order = JSON.parse(sessionStorage.getItem("cart"));
      console.log(order);
      try {
        state.status = "sending order info to server";
        let orderHelper = { email: customer.email, selections: order };
        let payload = await poster("order", orderHelper);
        if (payload.indexOf("not") > 0) {
          state.status = payload;
        } else {
          clearcart();
          state.status = payload;
        }
      } catch (err) {
        console.log(err);
        state.status = `Error add cart: ${err}`;
      }
    };
    const clearcart = () => {
      sessionStorage.removeItem("cart");
      state.cart = [];
      state.status = "cart emptied";
    };

    return {
      state,
      formatCurrency,
      clearcart,
      saveCart,
    };
  },
};
</script>