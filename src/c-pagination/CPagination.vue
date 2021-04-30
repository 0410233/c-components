
<template>
  <div class="c-pagination">
    <button class="c-pagination__prev" @click="prevPage" :disabled="currentPage==1">
      <svg xmlns="http://www.w3.org/2000/svg" class="c-pagination__icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
    <div class="c-pagination__pagers">
      <div class="c-pagination__pager" :class="{'is-active':currentPage===1}" @click="changePage(1)">1</div>
      <div v-if="showQuickprev" class="c-pagination__pager c-pagination__quickprev" @click="quickPrev()">
        <svg xmlns="http://www.w3.org/2000/svg" class="c-pagination__icon" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </div>
      <div v-for="pager in dynamicPagers" :key="pager" class="c-pagination__pager" :class="{'is-active':currentPage===pager}" @click="changePage(pager)">{{ pager }}</div>
      <div v-if="showQuicknext" class="c-pagination__pager c-pagination__quicknext" @click="quickNext()">
        <svg xmlns="http://www.w3.org/2000/svg" class="c-pagination__icon" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </div>
      <div v-if="pageCount > 1" class="c-pagination__pager" :class="{'is-active':currentPage===pageCount}" @click="changePage(pageCount)">{{pageCount}}</div>
    </div>
    <button class="c-pagination__next" @click="nextPage" :disabled="currentPage==pageCount">
      <svg xmlns="http://www.w3.org/2000/svg" class="c-pagination__icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 15,
    },
    pagerCount: { // 最多呈现多少个页码，包括第一个和最后一个
      type: Number,
      default: 5,
      validator: function(value) {
        return value===5 || value===7;
      },
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },

  data: function() {
    return {
      showQuickprev: false,
      showQuicknext: false,
    };
  },

  computed: {
    // 页数
    pageCount: function() {
      return Math.ceil(this.total/this.pageSize);
    },

    // 动态页码
    dynamicPagers: function() {
      const left = 1;
      const right = this.pageCount;
      const length = this.pagerCount - 2;

      // 最左侧动态页码
      let start = this.currentPage - (length - 1)/2;

      // 最右侧动态页码
      let end = this.currentPage + (length - 1)/2;

      if (start <= left) {
        start = left+1;
        end = left+length;
      }

      else if (end >= right) {
        end = right-1;
        start = right-length;
      }

      const pagers = [];
      for (let i = start; i <= end; i++) {
        if (i > left && i < right) {
          pagers.push(i);
        }
      }

      this.showQuickprev = start > left+1;
      this.showQuicknext = end < right-1;

      return pagers;
    },
  },

  methods: {
    // 跳转到指定页
    changePage: function(page) {
      this.currentPage = Math.min(Math.max(page, 1), this.pageCount);

      this.$emit('current-change', this.currentPage);
    },

    // 上一页
    prevPage: function() {
      this.changePage(this.currentPage - 1);
    },

    // 下一页
    nextPage: function() {
      this.changePage(this.currentPage + 1);
    },

    // 往前跳转 pagerCount-2 页
    quickPrev: function() {
      this.changePage(this.currentPage - (this.pagerCount - 2));
    },

    // 往后跳转 pagerCount-2 页
    quickNext: function() {
      this.changePage(this.currentPage + (this.pagerCount - 2));
    },
  },
}
</script>

<style>
  .c-pagination {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .c-pagination__prev, .c-pagination__next, .c-pagination__pager {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    margin: 0;
    padding: 0;
    background-color: #f4f4f5;
    color: #606266;
    box-sizing: border-box;
    border: none;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    margin: 0 5px;
  }
  .c-pagination__pagers {
    display: inline-flex;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
  }
  .c-pagination__pager.is-active {
    background-color: orangered;
    border-color: orangered;
    color: #fff;
    background-color: #409eff;
      color: #fff;
  }
  .c-pagination__icon {
    width: 20px;
    height: 20px;
    color: #606266;
    fill: #606266;
  }
  .c-pagination__pager > .c-pagination__icon {
    width: 14px;
    height: 14px;
  }
  .c-pagination__prev[disabled], .c-pagination__next[disabled] {
    cursor: not-allowed;
    color: #c0c4cc;
  }
  [disabled]>.c-pagination__icon {
    fill: #c0c4cc;
  }
</style>
