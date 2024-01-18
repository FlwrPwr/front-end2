<template>
    <div class="sponsorDiv">
      <div class="imageDiv">
        <img :src="Logo" :alt="Titlu">
      </div>
      <div class="dataDiv">
        <div class="titleDiv">{{ Titlu }}</div>
        <div >{{ $utils.Ellipsify(Descriere,100) }}</div>
      </div>
    </div>
    </template>
    
    <script>
    export default {
      name: 'SponsorComponent',
      props: {
        Logo: String,
        Titlu: String,
        Descriere: String,
      }
    };
    </script>
     
<style scoped>
.sponsorDiv
{
    display: flex;
    align-items: center;  
    background-color: rgb(236, 224, 224);
    height: 12rem;
    width: 35rem;
    margin: 1rem;
    border: 1px solid black;
    border-radius: 10px;
}
.imageDiv
{
    height:90%;
    width: 10rem;
    margin: 1rem;
    display: flex;
    align-items: center;

}
img
{
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.dataDiv {
    display: flex;
    flex-direction: column; 
    justify-content: start; 

    width: 21rem;
    height: 11rem;
    padding: 1rem; 
}

.titleDiv {
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 0.5rem; 
}
.descriptionDiv
{
    
    margin-top: 0.5rem;
    display: -webkit-box;
  
  max-height: 3.2rem;
  line-height: 1rem;
}


</style>