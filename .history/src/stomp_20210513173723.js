import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "websocketdemo",
  data() {
    return {
      received_messages: [],
      send_message: null,
      connected: false
    };
  },
  methods: {
    send() {
      console.log("Send message:" + this.send_message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { name: this.send_message };
        this.stompClient.send("/", JSON.stringify(msg), {});
      }
    },
    connect() {
      console.log('connect stomp');
      this.socket = new SockJS("ws://127.0.0.1:15674/ws");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
         // console.log(frame);
          this.stompClient.subscribe("ex.producer.aula-spring", tick => {
            //console.log(tick);
            this.received_messages.push(JSON.parse(tick.body).content);
          });
        },
        error => {
      //    console.log(error);
          this.connected = false;
        }
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    }
  },
  mounted() {
    // this.connect();
  }
};