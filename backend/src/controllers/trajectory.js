// 处理轨迹数据
const fs = require("fs");
const path = require("path");
const storage = require("../storage/redis");

const store = storage.redisStorage();

const status = {
  有: 0,
  无: 1,
  未知: 2,
};

class TrajectoryCtl {
  init() {
    const pathName = "../json";

    // 将所有数据存储到redis中
    fs.readdirSync(path.resolve(__dirname, pathName)).forEach((file) => {
      fs.readFile(
        path.resolve(__dirname, pathName, file),
        "utf-8",
        (err, data) => {
          if (err) throw err;

          try {
            const province = file.split(".")[0];

            JSON.parse(data).forEach((person) => {
              // 武汉（湖北）接触史
              let flag = 0;
              Object.keys(person).forEach(async (key) => {
                if (key === "基本信息") {
                  // TODO
                  try {
                    flag = status[person[key]["武汉（湖北）接触史"]];
                  } catch (e) {
                    flag = -1;
                    console.log(e);
                  }
                  return;
                }

                let traj = person[key];
                // ['116.256789,32.653255', '', ...]
                let posArr = traj["途径地点"].map((d) => d[1]).join(";");

                posArr !== "" &&
                  (await store.add(province, flag + ";" + posArr));
              });
            });

            store.add("province", province);
          } catch (e) {
            console.error(e);
            console.log(file);
          }
        }
      );
    });
  }

  async getAllData() {
    const province = await store.get("province");
    const res = {};

    for (const p of province) {
      const data = await store.get(p);
      res[p] = data;
    }

    return res;
  }
}

module.exports = new TrajectoryCtl();
