import { Banner } from "@vkontakte/vkui";
import React from "react";
import { Info } from "../news/components/hooks";

const getCountStr = (val: number, str: string) => {
  const i = val.toString().slice(-1);
  if (+i === 1) {
    return val + " " + str;
  }
  if (+i === 2 || +i === 3 || +i === 4) {
    return val + " " + str + "а";
  }
  return val + " " + str + "ов";
};

const Meta = () => {
  const { countUsers, countMasters } = Info();
  return (
    <Banner
      header={<span style={{ color: "black" }}>С нами уже:</span>}
      subheader={
        <div style={{ color: "black" }}>
          <div>{getCountStr(countUsers, "клиент")}</div>
          <div>{getCountStr(countMasters, "мастер")} красоты</div>
        </div>
      }
      asideMode="expand"
      mode="image"
      background={
        <div
          style={{
            backgroundColor: "#ece7d2",
            backgroundImage:
              "url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhUSEhAVFRUXFxUVFRYVFhUVFRYWFRYXFhUVFRYYHSggGBolHRcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0mHyUtLy8tLi4tLS0tLS01LS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBKwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xABBEAABAwIEBAQDBgQEBAcAAAABAAIRAwQFEiExBkFRYRMicZEygaEHI0KxwdEUUmKCouHw8RUkM8IWY3Jzg5Ky/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAECAwQFBv/EACsRAAICAQQBAgUEAwAAAAAAAAABAhEDBBIhMUETIgUyUWFxFJGx4YGhwf/aAAwDAQACEQMRAD8A64EqRCzEhUIQgYIQhAwSFKkSA8vbII66LD3WEtDqtNmZ4bE83Au+pW4qugEqiwR4fVrVtBMMjn5eZRuro2afJLHGUkUuKYAf4cBj8xA+E6Ok91i8T4Sv2tyuh7C6QQfouuXVKdZ13lZ/Eaj6culzhrpMAfJOGRpjjNydydnKLixa0mWlrhpG0xuO6lswx9E03FwIeANJJk7gdoTl1h1arcOdTBDWukZjqwug6dU+9tznFOsS6NnciDzBC2buDZkUZRtKie23kZW7u+N2wDfxAdBGnzKj37nSWUtm/E87ZtN+p205flKDxQo+Ygk9Ndtm+nVZ+8xJzgc0NZ+FjdTqRr01681DGm2c+Tot8HeM4YHF0GXGdz3/AGXUsMpnIJXNeDh4j2DQDcNAgQOcxr9F1m2pw0KjUP3UK6R4yIDV6uqjabS5xgDcrnuM8YVqji23a4NGktbmJ/ZUwxOb4JJnQDUaN3D3XptRp2cPdccff3pJJbV+c/kmXYxcjfMPmr/0j+oWjt7UpXJMM4urMj7wx0Oo91d0+N3f7qqWnmvA0k/Jv5TjSsnh3FbXwHCD+fzWkoXIcJBVTTXYSg0SgV6TbSvSZU0KkKF5c5KwSArySq/EsUbSEnVZHEeNnDQNhOMJS6RaoOrN6XBNPrNG5A+a5VdcXV3E/eR2Ez9FXPxapU3Lj8yT+SuWlm+w9q8nXatRh2cPcKJWauY0ra8ePJSqnpoffVWNjc4lbavo1CzmHNMDqZjRKWla6aJxmkaTEGLL17bzHRaendsr087P7hzBVc9glLG3Hhlzdo6OhCFI5QqEIQAIQhAwSJUiTAi3lXyuDIzAaA9Vh8AxV1Go5lQGC7WQfKSdVrsVrBhGhnfQfqsld3BPiub5qg+JjogAIj9zqaXGnBprhm0q3DQJJ06rH8RYpSAc1kl0Tl6zyTFri91UaGMaGkDciY6KnvDWbUmq0SZlwPPvCnHHzyTxaOpe5/sZjEXXWbN5qZLmjKdOWnror+li5rU2UC3VojODJjmexUXHK7AJqkCRDSAdz0CpsMuRTDiJ31PYK+t0eieaKjwWuOvaYkQ1ogNP0kdeyyVR5e4zOvzJAKsLmoajS8mG6meZPIfmoFI6hoGp36wOXYdVfjjtRysjtnRvswoZqj3HcAD07fmurNCwX2U2eWi5xGpOq6AAufmd5GNkC/sRW0f8P8v7pKVtRpiG02j5Ber66DVmsQxyNlGMXLhE4QcjR1Lho3hQq9Gg/wCJjD6gLIvxGrUPlKtLCwuXQdY7kK54dqts0rAkrs93PC1m8zkg9RooVbg5n4X/ACcP1CufBrs3EpWXB5hVtzXTFsfgz5wB9MyBPcft/rl0Wiwhzuc8vy5J2nVlPU9Cq5Sb7Bvii0oOTyjUXKQCoGZoUqNdvgJ1zlCu3BIlFGNx+q6q7K0E7QPzKqafCFWoc1R+QdOY9lt/KNgE25rnbLRjnJLgv4ZSWfC1nT+JpqH+o6ewVtQZb0/hpsb0hon3UynhRPxGFGvcDMSHfLZSvc+WCUL7JdK/YFKZftPNYa/p1Gc/qoFPFXNO6l+ntWmSlhia/EcNYHeNRGV342jQVG8xHXuqmszzGFLw/Ey9uqbrOBcSqHadMSi4m6QkSqZzBUJEqBghCEACRCEgM/xNWrNBENFMj458zT0A5qhtrqG5TDnEauGhPqvf2iXdVzSGmGMIzRuT3WVOJucwBjoGmYgAH/dSxJSTOv8AD2nFwZHrXbqVZ7/FLJdOp8o5fDzVhTcKrHPc8OJJOfUExp8lAZQouIDmgyZc7Uu9CVZ4uLIUYYIeY1k6H06K+Xjg6E048pGWvaQIh5zEE5dZEE7yo7rdxJAIDe4k+/RaO3ZSDSGDN5dSRr2AWYLAC4EkwTpO3turIvwZc0OOQu2SGta4EDr5ROq8YfaQ4k6nft0aCeQUPwnO8wJkSPi5fNW2G+XK3IdSJ7n9T9ArW6RyXG5HYOAKGW2GpMkkk8zzK01R0AlU3CLIt2fNWd8fKVym7bYSXuoy2L4k2Ynqshe13VHeXQH6qdxXYuBNRkg842PqOenNZy3xOIDjGsadwdDzGx9h2XQwwW20WSntaRsMBtBInT/XRbuzYANFznCcRpg6PA9dZ76La2GI08ur29dSIjrMxHdZ8ylZqzLdFUXRAUW4smu1A1UKtxFZs0dd0Wn/ANxk/mojuNMPE/8ANMMaEjMRr3aCIVKjLwjHdeQr2zmGeS90HynLXiKwuCKdO6pPc74QHalL/DZHEKMk12Wqe7snWrlMAVfbFWbdlBFeThkeqFV3BlWtzsqt7ZQuyUerGKFAvPZW1vbBvJRLm9o21MOqvyg6CGucZ32aCVSO+0HDw6DUqj1t6/5liuUZS6RCU7NdCYuXiFmW/aFh2xrOb0L6VUev4eSer8UWbhIuqfrmA/NDxzXaZLHTfZU8QxqQTPPT22WGvX+bQytLieK2lQz4wPSMx+sR9Vl8ZdTBlpMdwf0W7CmlTNWfJDZw0W+B35kA81euEmVhcGa6q9u8A7dfXqts2k6FTqIpMhim5Lk6ShKkVBzBUIQgYqEIQAiEISAz2K8L062YFzoe/O7Xrv8AKAqfG+G7Ci0hjCHmNnGSBy7Bbkqj4gwptYZmxnHolGW3pmrTSSyJtnP8bxWg2KbaQbpA0jX9VQ29Km6pDnOy8o0k9ym8Vw+oaznkk5Tse3ReaNGrk8zNCdCOS2wSrs7atumuC4FhTbLaVXLyJ/QdlU4xaWtNoDXEP0mJ17n1SPtnSKcuYdx3HVMUrVrs3iPBc2fNmP5JpV5DLDjhFfRLXOGbSD8X781pg4Oe1gB0Gke+6p6tjlbmEEd+feVf4HQc7zOHIAHsPzUcklVnO2NNo6nws2Ldg7KbdKLw7/0R6n81KuVzrMkl72UOI3FuARVe1gG/ieSO/mjTvsuY8QXdiXfcvD41lshpdvDdDmAgyfRdge5Z/G6bXCDTaenlErRhzKD/ALJODmqOM1Kok6g/idAaQJjSdieu+pPRFsxzh5QToSTDdQIiNFuRhkO0pj2HbXbfQeyusOsHcmR7fststUkuiEdL9WYi1w+7Pw0CNYIIa2ZABk6d/wDD89Fh3DdZzmufUyuBkRLzIiHTpldImZOsRGy2Vvh7jurizw8N5LHPVSfRP0oRHbNhDRPmP8zg2f8ACAPokqM1lSg1eHhZmRiqYxTGqsKeyhAaqXSKEOfJ4udlAa3VWFzsoVNJ9jj8o4wuGyw/GWG16zw7ykCAJExGY7EHc5SeuQDZb1gTVxbB3JWQntdohtV8nELrBrhkxTJGg8pJ3P8ATryPLmFW16DwNWOE6wdZ17jnH17LtV3hXRVNfCj0/X81rjq35RL0IPpnHHPAO8fIT6j2PuE7a3NuajfFqGCYdzIk9OY2+q6He4UdfL9ArTh+3Y0RkaP7QFbLVquhLS+UyrwSrh7Gjwq9N528pDnE9A0arQNZOuSOx3HrCt20m7hoB6gBeHW652TJudmmLrsv0IlCsOaKhCExAlSISGCChIUmCMti+M1GuIIEDkF5otztDiIkSn8WwYDzalvfkodrULRBf5RoAV5fU791S+Y9DD03iXpEDEbClIzSBOsbxzRj19Y0rcNotBIgaMJMdSo2OYhTptLnu0HuewUpvEVs+2GVha0ty5XAZi5df4bPIo+7oNRKnDnn/hhcRxjxGtBpEf18x8+qrKDPvC13mG5I/wBlYXgdkLgJAcYA9VV02VnPzFpb66LvxrwGWSUkWGNVaYpjwyBBAjUCT2W2wOlmt6burR781y67ztdLzImd5HyXTeDa2ayBHIk/UyqNRGoL8mXdum2bnAHfdx0JU6u1UHCF3m8Rs7EfstHUCx0Y8qqbKyo1R3WoO6nVQvASLF0RqeHt6KZRtGjknaafYmQk2IykE6GoC9hBU2NuCZepJUeqhkojKl0VDlS6JQhy6C4ChtGqm1VFI1Qwj0PUwnIXmmnEEWNOppmpbg8lLSOCAsqq1gDyUT+BDTICu6ijuCLLYyZGo0lJFEL3SYpIYhIjKYiAkSq4xnpIgIQAqEIQMEiVIgAIB3WU4rDgJp0oDZLnBu/tyWrVPxJizben8Od7tGtOxPfss+fEpx5LsWd4XuOK3V+19w11Sm57WnUD9k/jHEoqeWnRLGjQTAP0UzEnv8zyWjM45nAczyaqezNDxBnktGsfzHkFFQg6bj10Zf1eSeTehbHEXOy0pLWkyTMH3KsLilRdIol1Sp0zSBK8u4Su713iNY2nTHImNOk9VZixbYnK6llB5g5j8yr8mpSgnHv6f2dzDKeX2ZFX8/sUbeDLt3mLmgdCZ+i2fBWFVLelVo1DPmzCOjhr9QpOG2zrkBwJbT/m2J9P3VpSqsa/K0E02t8N1Rx0Lj8LQT8R/dVQ1GXLBqaKskYYsq2uxvh+h4FyAJh7SCT/APYfktqdlky7K9jo2IC1VJ0hSTsq1C5TItcJhS64UQqLHDlD1MqS0qExykschCmiQ0r2E01OBSKWKVDrmTAUsqHmEklDHA8tp6hTaQVY7EqbXBudocdgXAE+glSaNYpJkpRZNc1RqlLmldWUO7xqhRc1j6rQ5wkNJ8xHWOndS7IxUvBMpaaJ5MUrhr4IUhIUhEEoKae5AJWeKrkxKKj14YdVGy9RpEmknpTdNqQuUih9jiEIVxmFShIgIA9IQhAxEIQkJAs7xnhNW4pt8EU87TvUkadAQtGE3VcGglx0G6i0EkmqZxupwZfvqQ97C0ampmOQTyAiSewVpb8DU6RFV1U1Gt1ADcoHUkarXYviNKqGhjwQNTrAPZQ6dbLsfkqczcouKdEMOeOLImlaRNq3dq1rKbajQNA3oSmjZl7i1w0G5IB9kltQpVHD7puYHpERzhWDq7HODM0NmSQYkjU6qqCdUzTlnjk1LG3b7spMTu3M8rWFrBE6Rp3KbcW3fiU6jclCiKdVpZMOIkmT1kbJ3/xVZvreBUzec5GjKSHa5Rtt81bV6dCmDa0nNpuLS4CQXayA6Dv/AJLTDhWKWPJjlUjn3C3H1Os80q4FN0nwydA4ToDOzl1e3dsvmrjLh82dU0jUzmC4mImSYK+isFrCpb0ag/FSpu92gq/PjhGpQ6ZYsjkqkS6hUOopblGrBZWW43Q2wqXTKhNUmk5JFsiYwr2EzTKeCkZpHoqhxDxGuJAlp6bgq9Kaq0gUMljltZzHGeDhc1BUL3AAzG5WkwjxaTPDfU8QD4XH4o/lcefqtC62HRQ61lzQ8kmqZo9RS7GHXLoJ9pWXbwiXXJun1S4u1cDyPQdoha5lopTLdKM3HoW9R6ImFTIgQwaDv3V6Co1KkAnwU0yjI9zFcVFquT7iotUoYQQxUcvduNU0VJtwooum6RJmAqe6vgHESrOu9ct4q4i8K6q052y/VjT+qvxwc3SM8WlyzrCEIUjKCVIhAHoISIQAJUiEgQpUe7EtI3kHRPlIQk1Y2c+Fqxjy06wfQa7BSQW8gmeIKZZXLY0gHXn6L1bVQ0Z3QSPhA29T6KuStHO27ZNFtTr+GzKT5iNewPJVAJJAZJdOg6kKObh0kyT69ZT9lXDB4p0g89hOhJUKLo3NpFlguAk1xXq0Wtc38Whc48jouc/aXb1hiD3vcQ05TSIOwDQDHTWfddpw6vnYHQR6iJ7wuffaq2l4TJI8YO8v82Qgzp00C0YZbZI6MOXzycnvnPecz3OcYiXEk+5XdPsrvPFw2j1p5qR/scQ3/DlXEq7YbK6F9hmJR/EWxO5bWYPlkfHsz3WrOt2P8DkqZ1VzUxUYpZCbc1c8kmVzgvbCvVVibhRNF2iZScpAcqp1fLqdkn/HbdrS51QachqfkE0m+iDhKXSsuJSFYy9425U2R3duoFTG6lSM9WAZkSRHaAFcsMn2a8fwzM1cuDdVbmm34qjR8wlDMwlrgR1BWGpXVGSHOJMCIAI9T8j/AJJbLFmMcZDojXKcs+mo7oeEtfw5pe1u/wAGzq1abPjqNHaRPsvdG4pu+F7T6ELEf8TY52lMwdTpLp5juPqn76tRIzMOWJ10aTGxjnPb5wj0Q/QdJtm4CJXPbbiitTPxZh0dqtJhnFdCro/yHvt7qLxSRnzfD82PmrX2Lt7lHqINZrvhcCOyQqpmVcDYCk0wmQ1PNCkkKbEeJXzLxzdGriFy9p08VzR/8fk/7V9K4ndNo0alZxhrGOefRoJXy1VBe5z3buJcfVxJP5rfouG5GfIrVH1khCFnKwQhCABKkQgQqEISGKg6CUiHaiEmMpMWs6dfK5zi0CQC2JPVsH3WIv64NV7WaNbo0HmBpt3XTH2lNzcpaCN479VFo4JbsOZlFoPWJPuUkq7E4Rl2c3rCoCWhp9YMLScKYU90vqGWbBu8kcz2TvENm9hL2Nkcx+ys+D6+a3ENIhzhrz1n9YS7L3ghGO9Fm4kLn/2n2OdrK0eZnkPcOOn1XRK7Csh9oFSk22e1zgHuLcjZ8xM7x0hEW1JDxfMjjeKQGgDqpPBeJfwt7QrEw3Nkqf8AoeMrp7CQf7VFuxmIAGxXilakyOmq3qttMunG5cH001yCsP8AZfxF/EW/gVHfe0AGmTq6nsx/f+U+ndbcFc+ScXTKqGntXjw085eFAmmR6tGdIWUx/hVzyalB5Y+NRyd6g6StnC8uCcZOLtFuLNLG7Ryapg9wwxUOXuB6+vZPDDmjylxd3zR9Bsuj3tq141CyWK4e9ricst/p5LXHOpdnc0ushl4lwxjDeGWVAS2plju7WT6/PXoeiXE+DajNqruZ0cf9cx7pm2uHNMTvpB00V+atd7B5WnTTLEEc56Hb2+abbvsnleWE09yohWvBT2j7ysRG+pnvHVRMQwekx2VlRxgwSHCN+p+at8YrVcpNR7Ikw3MJ19eSzrnvedAXctBp7pJvtsWn9WfvnNV9uho4ayNXv9AQe/MKVg3Cz6rgXVX5JE7CfTKB2U/DcGc4g1NB05rX0Cyk3kAPkozz1wijV6tR9uN2xy0sWUmBrRAC9lqYbfsc7I1zS6M2WRmjrG8L34iys4zUruQ6Gr0Sqy/xVlMhpkud8LB8TusLO4Bj5dXqU3ucC5002vIInZ1MHkToQNtxzBV0MUpR3Ivx6HLkg8i6XJB+2XHfCtm2rD56580cqbTLp9TA91yqjaSAVuftR4Yruqm/Y51Wi4NDxHmoBumoG9PczyJM9Vk2OEabLXiaUFtMkY8uz6PQkSrMZASpEIEKhCEDFQhCABCEIAEIQkA3Woh26gU2G3zuazMDrlGmo5hWaQhRaJqVcFfhuJGsCSGt6c/kVkcdwF1aq576hc6YiNgOQWrq2jWOLmjQ7pxrGgSFG3ZfCai7Rzy44NFNuYncDRZO9tQ15A6EH5rrWJHUrDY5RBfIHqpY8jvk243ujyZbg+s6niVuWuIlxYe7XAy09RoPYLvlGsCuEYdQyYjb9PFb9V2aq4tdI/3U9S7af2M7hy0WpK8pihXDgngVmIVQ41I5DSlKYhio1RatGVOKMqRYnRS1sNB3A9lGOHdh7LTtpgpf4cdE6ZYtRJGZp4aOg9lKp2UcldGgOiQU0mmJ52yvp0oVTxLfGkzNlzRrB2mQGz1EmfktI9ipMepgNzObmaJDx1Y7c/KAUR4krLdPKPqJyVmMxh9YVGXJc3UNyvp6CR1/q6zutbw9jouWlr9KjRM9R1H6hZW6o+DIpnxbd+pZuW92/uEvCdpUNyyowOFNuYucREgtIy95MLqZljyYt30O9qMeLNprde1cPr/Ff6L3iiw8YCDDm603DkfxNPbYrBXBcHEPBDucro2M2lTIXUzrHwnUE8lWWlGjcD7ylLho4EkOaekjksuDUOEafRn0Wr9GHPK/gsuB8UdVokPOYtOVxOuYHYnqYMf2yd1Gu/s0w6o9zw6rTDjOSm5oY3s0FpgduXLRW1hbMptysaGt3DR16k8yrAVSqHme5uPBydVtyZXKCpMnIQhXHHFQhCAFQhCYCoQhAAhCEACEIQAJEISYzzUEqtuZZqNkIVUui7F3RTXFeQe6qLu3aGkzqhCUToLh0Zihbf8AOW5/81n/AOguq37EIU8vghk+YgMqFpkKyoXQKRCpCSVEoVF6zIQhFLQkoBQhA0PMcF7zIQpEWhA5JKEIsKGXvUDEhLCEIVbL8fDMc3BGUgS+5FP4nNpkgEga6HcDfkdx87DhPHG1BkqHzDqZQhb5Yk9Opvs7600Z6Nzk+e/wakszKsxDh8/9Si7LUA57OH8rv35IQsMTz/qSg+CPh9/md4dQFlQbsd+bT+JvcK/Y1sJEIZbmXTXk/9k=)",
            backgroundPosition: "right bottom",
            backgroundSize: 150,
            backgroundRepeat: "no-repeat",
          }}
        />
      }
    />
  );
};
export default Meta;