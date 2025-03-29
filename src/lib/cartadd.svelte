<script></script>
<div class="check">
<div class="mini">
    <div class="arithmetic"><span>-</span><span>1</span><span>+</span></div>
    <button class="incart">Add to Cart</button>
  </div>
  </div>
  <style>
  .check {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: white;
    height: 70px;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  .arithmetic {
    display: inline-flex;
    width: fit-content;
    padding: 10px 10px;
    gap: 45px;
    align-items: center;
    border: 1px solid black;
  }
  .incart {
    background-color: black;
    color: white;
    padding: 10px 49px;
    font-size: 14px;
  }
  @media (min-width:769px){
    .check{
    display: none;
  }
}
  </style>