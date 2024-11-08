<script>
  import Header from "$lib/header.svelte";
  import bgImage from "$lib/images/ecomabout3.jpg?enhanced";
  import cgImage from "$lib/images/ecomabout2.jpg?enhanced";
  import Icon from "@iconify/svelte";
</script>

<Header />
<div class="aboutuno">
  <enhanced:img src={bgImage} alt="background image" class="background-img">
  </enhanced:img>
</div>
<div class="heading">
  <div class="minhead">About Cloyta fashion</div>
  <div class="maxhead">
    Pellentesque habitant morbi tristique senectus <br /> et netus et malesuada fames
    ac egestas.
  </div>
</div>
<div class="aboutsec2">
  <div class="sec1">
    <p>
      In hac habitasse platea dictumst. Pellentesque viverra sem nec orci
      lacinia, in bibendum urna mollis. Quisque nunc lacus, varius vel leo a,
      pretium lobortis metus. Vivamus consectetur consequat justo. Sed interdum
      nunc ut tristique congue. Quisque maximus mauris et dui sagittis
      scelerisque.
    </p>
    <p>
      Quisque elementum tortor risus. Suspendisse nibh nisl, dignissim
      pellentesque mi eget, porta rhoncus quam. Curabitur gravida nibh sed purus
      efficitur, at pretium neque vulputate. Duis euismod aliquam tellus, in
      accumsan metus viverra finibus. Mauris sodales est nibh, quis bibendum
      eros aliquam sed. Etiam dolor ipsum, consectetur et tempor nec, mollis at
      felis. Quisque non tellus mauris. Duis venenatis posuere semper.
    </p>
  </div>
  <div class="sec2">
    <div class="icon"><Icon icon="streamline:store-1" /></div>
    <div class="text">
      <b>Cloyta store</b> <br /><br /> Kenya -785 15h street, office 478/B
      <br />
      Green Mall Nairobi<br /><br /> phone: +254715067768<br /> email:
      <span style="color:#f04f43; ;">lawrencemunenex@gmail.com</span>
    </div>
  </div>
</div>
<div class="section3">
  <div class="numero">.01</div>
  <div class="title">
    <div class="titlesec1">More about Cloyta fashion</div>
    <div class="titlesec2">
      Ullamcorper sit amet lorem sed, tempus <br />eleifend lacus.
    </div>
  </div>
  <div class="par">
    In hac habitasse platea dictumst. Pellentesque viverra sem nec orci lacinia,
    in bibendum urna mollis. Quisque nunc lacus, varius vel leo a, pretium
    lobortis metus. Vivamus consectetur consequat justo. Sed interdum nunc ut
    tristique congue. Quisque maximus mauris et dui sagittis scelerisque.
  </div>
</div>
<div class="longpar">
  In hac habitasse platea dictumst. Pellentesque viverra sem nec orci lacinia,
  in bibendum urna mollis. Quisque nunc lacus, varius vel leo a, pretium
  lobortis metus. Vivamus consectetur consequat justo. Sed interdum nunc ut
  tristique congue. Quisque maximus mauris et dui sagittis scelerisque. Donec
  laoreet at turpis non molestie. Aenean dui leo, rutrum ac nisl ac, accumsan
  feugiat eros. Curabitur tempor vestibulum massa, vitae tincidunt justo congue
  at. Aliquam ullamcorper sem elit, vestibulum cursus dui dictum vitae.
  Curabitur vestibulum semper dolor, quis lacinia urna elementum vitae.
</div>
<div class = "lastsection">
  <div class = "lasttext">In hac habitasse platea dictumst. Pellentesque viverra sem nec orci lacinia, in bibendum urna mollis. Quisque nunc lacus, varius vel leo a, pretium lobortis metus. Vivamus consectetur consequat justo. Sed interdum nunc ut tristique congue. Quisque maximus mauris et dui sagittis scelerisque.</div>
  <div class="imagecontainerab"><enhanced:img src={cgImage} alt="lasy image" class="last-img">
  </enhanced:img></div>
  
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
  .aboutuno {
    height: 310px;
    max-width: 100%;
    background-size: cover;
  }
  .background-img {
    position: relative;
    height: 310px;
    width: 100%;
    z-index: -1;
    object-fit: cover;
  }
  .heading {
    position: absolute;
    top: 304px;
    left: 0%;
    z-index: 20;
    background-color: white;
    width: 72vw;
    height: 186px;
    padding-left: 13px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .minhead {
    color: #f04f43;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
  }
  .maxhead {
    color: rgb(0, 0, 0);
    font-size: 32px;
    line-height: 38px;
    font-weight: 500;
    margin-top: 8px;
  }
  .aboutsec2 {
    height: 270px;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 0 13px;
    border-bottom: 2px solid rgba(128, 128, 128, 0.2);
  }
  .sec1 {
    flex: 0 0 70%;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
  .sec2 {
    flex: 0 0 23%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }
  .icon {
    color: #f04f43;
    margin-bottom: 122px;
    font-size: 28px;
  }
  .text {
    margin-bottom: 0px;
    margin-left: 8px;
  }
  .section3 {
    margin-top: 60px;
    display: flex;
    flex-direction: row;
  }
  .numero {
    flex: 0 0 7%;
    display: flex;
    font-size: 30px;
    align-items: flex-start;
    font-weight: 300px;
    justify-content: center;
  }
  .title {
    flex: 0 0 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }
  .par {
    flex: 0 0 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
  .titlesec1 {
    font-size: 12px;
    font-weight: 600;
    line-height: 12px;
    color: rgb(205, 205, 205);
    align-self: flex-start;
    margin-left: 68px;
  }
  .titlesec2 {
    font-size: 32px;
    font-weight: 400;
    line-height: 38px;
    margin-top: 20px;
  }
  .longpar {
    margin-top: 60px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    padding: 0 13px;
  }
  .lastsection{
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    padding: 0 13px;
    

  }
  .lasttext{
    flex: 0 0 32%;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;

  }
  .imagecontainerab{
    flex: 0 0 67%;
    height: 592px;
    position: relative;
    margin-left: 20px;


  }
  .last-img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    
   

  }

</style>

