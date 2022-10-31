<template>
  <div class="edit-container">
    <h1 style="font-size:50px;padding-left:10px">{{ word }}</h1>


    <!-- 基本信息-- 以下 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
        <el-button style="float: right;" type="primary" size="small" @click="baseEditableBtn">编辑</el-button>
      </div>
      <el-form label-width="80px" ref="baseInfo" :ruels="ruels" :model="baseInfo" :disabled="baseDisEditable">
        <el-row>
          <el-col :span="6">
            <el-form-item label="部首" prop="req">
              <el-select v-model="baseInfo.redical" placeholder="请选择部首">
                <el-option label="一" value="shanghai"></el-option>
                <el-option label="二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="笔画" prop="req">
              <el-input v-model="baseInfo.count"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="页数" prop="req">
              <el-input v-model="baseInfo.page"></el-input>
            </el-form-item>
            <el-form-item label="字码" prop="req">
              <el-input v-model="baseInfo.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onBaseInfoSubmit">确定修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 基本信息-- 以上 -->

    <!-- 拼音信息-- 以下 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>拼音信息</span>
        <el-button style="float: right;" type="primary" size="small" @click="pinyinEditableBtn">编辑</el-button>
      </div>
      <el-form label-width="80px" ref="baseInfo" :ruels="ruels" :model="pinyinInfo" :disabled="pinyinDisEditable">

        <el-row>
          <el-col :span="4">
            <el-form-item>
              <el-tag>南部</el-tag>
            </el-form-item>
            <el-form-item v-for="ele in pinyinInfo.southList" :label="ele.local" prop="req">
              <el-input v-model="ele.pinyin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-tag>东部</el-tag>
            </el-form-item>
            <el-form-item v-for="ele in pinyinInfo.eastList" :label="ele.local" prop="req">
              <el-input v-model="ele.pinyin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-tag>西部</el-tag>
            </el-form-item>
            <el-form-item v-for="ele in pinyinInfo.westList" :label="ele.local" prop="req">
              <el-input v-model="ele.pinyin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-tag>北部</el-tag>
            </el-form-item>
            <el-form-item v-for="ele in pinyinInfo.northList" :label="ele.local" prop="req">
              <el-input v-model="ele.pinyin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-tag>东南</el-tag>
            </el-form-item>
            <el-form-item v-for="ele in pinyinInfo.southeastList" :label="ele.local" prop="req">
              <el-input v-model="ele.pinyin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-tag>中部</el-tag>
            </el-form-item>
            <el-form-item v-for="ele in pinyinInfo.middleList" :label="ele.local" prop="req">
              <el-input v-model="ele.pinyin"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onPinyinInfoSubmit">确定修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 拼音信息-- 以上 -->

    <!-- 释义信息-- 以下 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>释义信息</span>
      </div>
      <el-form class="explain-form">
        <el-card class="box-card" shadow="hover" v-for="ele, index in explainList" :key="ele.key" ref="ele"
          :model="ele">
          <div slot="header" class="clearfix">
            <span>{{ index + 1 }}.</span>
            <el-button style="float: right;" v-if="ele.key" size="small" type="danger"
              @click.prevent="removeExplain(index)" plain>删除释义</el-button>
          </div>

          <el-form-item label="释义：">
            <el-input v-model="ele.explain"></el-input>
          </el-form-item>

          <el-form-item label="例句：">
            <el-button type="success" size="small" icon="el-icon-plus" @click="addSentence(index)">添加例句</el-button>
          </el-form-item>
          <div v-for="sentence, sentIndex in ele.sentenceList" :key="sentence.key">
            <el-form-item label-width="70px" :label="(sentIndex + 1) + '.彝语'">
              <el-input v-model="sentence.yi"></el-input>
              <el-button v-if="sentence.key" type="danger" @click.prevent="removeSentence(index, sentIndex)" plain>删除
              </el-button>
            </el-form-item>
            <el-form-item label-width="70px" label="汉语">
              <el-input v-model="sentence.han"></el-input>
            </el-form-item>
          </div>
          <el-form-item>

          </el-form-item>

        </el-card>
      </el-form>


      <el-button type="primary" icon="el-icon-plus" @click="addExplain()">添加释义</el-button>



      <el-button type="primary" @click="onExplainInfoSubmit">确定修改</el-button>


    </el-card>
    <!-- 释义信息-- 以上 -->

  </div>
</template>

<script>
import { getWord, updateBase, updatePinyin, updateExplain } from '@/api/word'




export default {
  name: 'edit',
  data() {
    return {
      "baseDisEditable": true,
      "pinyinDisEditable": true,
      word: "字",
      "baseInfo": {
        "redical": "",
        "count": "",
        "page": "",
        "code": ""
      },
      "ruels": {
        "req": [{ required: true }]
      },
      pinyinInfo: {
        northList: [{
          local: "隆林",
          pinyin: "longlin"
        }], southList: [], eastList: [], westList: [], middleList: [], southeastList: []

      },
      explainList: [
        {
          explain: "释义1",
          sentenceList: [
            {
              yi: "彝文句子1-1。",
              han: "汉语句子1-1"
            }
          ]
        }
      ]
    }
  },
  methods: {
    addSentence(index) {
      this.explainList[index].sentenceList.push({
        yi: "",
        han: "",
        key: Date.now()
      })
    },
    removeSentence(index, sentenceIndex) {
      if (index < this.explainList.length) {
        if (sentenceIndex < this.explainList[index].sentenceList.length) {
          this.explainList[index].sentenceList.splice(sentenceIndex, 1);
        }
        ;
      }
    },
    addExplain() {
      this.explainList.push({
        explain: "",
        key: Date.now(),
        sentenceList: [

        ]
      })
    },
    removeExplain(index) {
      if (index < this.explainList.length) {
        this.explainList.splice(index, 1);
      }
    },
    onBaseInfoSubmit() {
      updateBase(this.baseInfo)
    },
    onPinyinInfoSubmit() {
      updatePinyin(this.pinyinInfo)
    },
    onExplainInfoSubmit() {
      updateExplain(this.explainList )
    },
    baseEditableBtn() {
      this.baseDisEditable = !this.baseDisEditable;
    },
    pinyinEditableBtn() {
      this.pinyinDisEditable = !this.pinyinDisEditable;
    },
  }
}
</script>

<style lang="scss" scoped>
.edit {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

<style>
.box-card {
  margin-bottom: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.radius {
  border: 1px solid #d7dae2;
  border-radius: 2px;
  padding: 20px 20px 0px 20px;
  margin-bottom: 20px;
}

.explain-form .el-input {
  margin-right: 10px;
  width: 70%;
  vertical-align: top;
}
</style>
