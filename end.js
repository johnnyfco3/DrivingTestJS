const score = document.querySelector('#recentScore')
const recentScore = localStorage.getItem('Recentscore')

score.innerText = `${(recentScore/50) *100}%`
