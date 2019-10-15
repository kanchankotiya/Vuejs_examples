export const fruitMixins = {
  // data() {
  //   return{
  //     fruits: ['Banana', 'Mango', 'Melon', 'Apple'],
  //     filterText: ''
  //   }
  // },
  // computed: {
  //   filteredFruits(){
  //     return this.fruits.filter((elememt) => {
  //       return elememt.match(this.filterText);
  //     });
  //   }
  // },
  // created(){
  //   console.log('Created!');
  // }
  data() {
    return{
      firstText: 'kanchan kotiya',
      secondText: 'second text'
    }
  },
  computed: {
    ReverseText() {
      return this.firstText.split("").reverse().join('');
    },
    calculateTextLength() {
      return this.secondText + '(' + this.secondText.length +')';
    }
  }
};