# Code Katas

> A list of the katas that I use 🥋

## ➕How to add/update a Kata ? 

Adding and updating a kata works by subtree. 
Each folder contains only one kata.

```sh
git subtree add --prefix=gilded-rose \         
  https://github.com/emilybache/GildedRose-Refactoring-Kata.git \
  main --squash
```

To update you can just pull with this command :

```sh
git subtree pull --prefix=gilded-rose/original \
  https://github.com/emilybache/GildedRose-Refactoring-Kata.git \
  main --squash
```

## ✅ How to solve one ? 

- Create a branch : `{kata-name}/{date}_{language}_{session}`
  - `gilded-rose/2025-10-14_ts_guild-back`
- Work on the kata
- Commit & Push 
- Create a PR following the same naming

## 📊 List

### 🌹Gilded Rose - by Emily Bache

> Original Link : https://github.com/emilybache/GildedRose-Refactoring-Kata

> [!TIP]
> Demo : https://www.youtube.com/watch?v=sZxL4uX9ioQ 

This kata is great to work on refactoring and showing how automatic it can get with the right steps.