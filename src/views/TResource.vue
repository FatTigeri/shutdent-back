<template>
    <div id="container">
        <el-row style="height: 100%">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-menu class="el-menu-vertical-demo mymenu" background-color="rgba(199, 201, 201, 0.1)">
                    <a href="" class="mymenus" @click="changeActive(0)">
                        <el-menu-item index="1" :class="active === 0 ? 'selected' : ''">
                            <span slot="title"><i class="el-icon-s-custom"></i>一年级</span>
                        </el-menu-item>
                    </a>
                    <a href="" class="mymenus" @click="changeActive(1)">
                        <el-menu-item index="2" :class="active === 1 ? 'selected' : ''">
                            <span slot="title"><i class="el-icon-s-custom"></i>二年级</span>
                        </el-menu-item>
                    </a>
                    <a href="" class="mymenus" @click="changeActive(2)">
                        <el-menu-item index="3" :class="active === 2 ? 'selected' : ''">
                            <span slot="title"><i class="el-icon-s-custom"></i>三年级</span>
                        </el-menu-item>
                    </a>
                    <a href="" class="mymenus" @click="changeActive(3)">
                        <el-menu-item index="4" :class="active === 3 ? 'selected' : ''">
                            <span slot="title"><i class="el-icon-s-custom"></i>四年级</span>
                        </el-menu-item>
                    </a>
                    <a href="" class="mymenus" @click="changeActive(4)">
                        <el-menu-item index="5" :class="active === 4 ? 'selected' : ''">
                            <span slot="title"><i class="el-icon-s-custom"></i>五年级</span>
                        </el-menu-item>
                    </a>
                    <a href="" class="mymenus" @click="changeActive(5)">
                        <el-menu-item index="6" :class="active === 5 ? 'selected' : ''">
                            <span slot="title"><i class="el-icon-s-custom"></i>六年级</span>
                        </el-menu-item>
                    </a>
                </el-menu>
            </el-col>
            <el-col :xs="19" :sm="19" :md="19" :lg="19" :xl="19">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
  
<script>
export default {
    beforeCreate() {
        // 对控制当前页面的index索引进行判断
        if (!window.sessionStorage.getItem('active')) {
            window.sessionStorage.setItem('active', 0);
        }
    },
    data() {
        return {
            active: parseInt(window.sessionStorage.getItem('active')),
        }
    },
    watch: {
        $route(newval) {
            window.localStorage.setItem("grade", newval.params.id);
        },
    },
    methods: {
        changeActive(index) {
            this.active = index;
            window.sessionStorage.setItem('active', index)
            this.$router.push('/math/Tresource/tResource/' + (index + 1));
        }
    }

}
</script>
  
<style lang="less" scoped>
#container {
    width: 100%;
    min-height: 37.5rem;

    .mymenus {
        width: 100%;
        text-align: center;
        background-color: beige;
    }

    .selected {
        i {
            color: orange;
        }

        color: orange;
        background-color: rgba(199, 201, 201, 0.3);
    }
}


.mymenu {
    margin: 0;
    padding: 0;
    min-height: 47.5rem;
    background-color: rgba(199, 201, 201, 0.3);
    font-size: 1.25rem;
}

a {
    text-decoration: none;
}

/deep/ .el-menu-item {
    font-size: .875rem;
}

router-link {
    text-decoration: none;
    background-color: #ffffff;
}

.el-menu-item.is-active {
    background-color: #ffffff !important;
    color: #fff;
}
</style>
  