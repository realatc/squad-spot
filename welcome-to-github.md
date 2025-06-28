# Baang-Cleaning-Services
## Web Programming Project

Hey guys - just throwing this together. Welcome to Github! I recognize this is most likely new to you - my goal is to provide us with an collaborative environment where we can make edits the most efficient of ways, as well as provide some insight of a popular tool used out in the software world. My goal is to NOT overwhelm anyone - so please do not hesitate to tell me if its just too much.

Github provides us with the means of working on the documents from within the Baang-Cleaning-Services repository (AKA "Repo") where I have gone ahead and added the files that Emma was kind enough to get us started with. 

The advantage of tool like Github is that it is a centralized repo where theoretically, we could all work on the same document at the same time by creating whats called a "pull" request. To start, what you see on the inital screen, or "Code" tab is referred to as our "Main" branch. This is our master/primary branch or our live code that we would publish to our website. We can all work (on our own time) on the same files by using whats referred to as local branches(or HEAD), with the intention of merging/updating our master/main branch. 

# Pause - breathe. A lot of terms. Please ask any and all questions as I rushed to put this together :) *

![Simple Diagram of Workflow](https://user-images.githubusercontent.com/81194720/202804777-68c3814e-784b-4ac8-a9a0-c3b022d3fc9a.png)

Hopefully this diagram puts into simple terms what was explained above. Note the main branch and how the feature/description/updates are created and then merge into the main line. That is essentially our goal.

Why? What are the benefits?

- It helps us keep an accurate log of the changes that were made - that way if we decide something was added incorrectly, we can refer back to previous entries and make changes.
- It provides an opportunity to review the work and verify prior to merging our main branch of code. Definitely one of the advantages here as we can prevent causing issues with good code on the main branch by finding it before it is merged, preventing issues down the line.
- Say there is a scenario where two people on the team were working on the same html file and made changes - not a problem! We can review the merge requests that were made and make decisions of what needs to be done prior to merging to the master.

## Example

Lets jump into an example. I am going to make an update to one of the files (Need a job.html). Starting from the main page on the "code" tab:

- Just below the actions tab, there is another tab that should default to "main" (our main/master branch). When you click the small drop down arrow, you will see there are a few options to note.
- First, there will be a list of all branches available.
- Second, there is a text-search box that says "Find or create a branch..."
- We are going to create a new branch. In that text box, type the name (I used atcbranch) you want to use. Once you do that, and assuming there are no duplicates, a new field will appear that you can click that says "Create branch: yourbranchname from 'main'". Go ahead and click it.
- Voila! You just made your own branch. You might notice though not much has changed - the same files appear as before (this is to be expected). We wanted this as we have essentially created "local" versions of our documents. You may notice this is similar to previous labs performed in class where we took the index.html or styles.css files and saved them on your computer. This is essentially the same, but over the cloud.
- Now you can go into the file you are working on (this example is Need a job.html).
- I have decided that I want to change the title of this page from "Need a Job?" to "Careers". Once in the file, there will be a pencil icon on the right hand side to edit. Go ahead and click.
- Make the changes you are looking to complete. I changed the title to "Careers"
- And to keep things tidy as well as a running log, take a second to add a note down at the bottom of the screen in the commit changes section. This will help in situations where Emma sees I made a change to the title and wonders why? She can see my note indicating why I made the change then as a point of reference. 
- Add your note and then click "commit changes"
- Congratulations! Just made your first commit :)
- From there, you decide to go back to the main page with all of your files.
- You should now notice an alert at the top of the scren indicating you made recent pushes. Go ahead and click "Compare & Pull Request".
- You should see a new page, where your earlier commit comment is displayed, but when you scroll down you begin to see a comparison (AKA as a "diff") of the changes made from the original content.
- You review and determine "this looks great" and decide you want to create your pull request. Go ahead and click that green button.

## Now Pause and bear with me. I promise we are nearing the end of this "light" reading.

Of course I want us to complete the project in a timely manner and be done with it, but this is something new to all of you that I am teaching and I feel I would be doing you a disservice if I do not explain the big picture of what we have done for learning purposes. Were almost there though - promise.

Lets recap.

1. I made my own branch (that can be used for future changes on all files, not just this specific scenario).
2. I went to that branch, which now has my own copies (or "local") version of the files.
3. I made a change to a file and created what is referred to as a "pull" request (the syntax/semmantics of pull will be explained at another time - but think of it as we are eventually going to "pull" our changes on our personal branch to the main one.
4. We did another review just to be sure we liked it and moved forward with creating the request.

Before we proceed, I want to take a moment to explain in a different manner of what were doing in Github. I know its tempting to now press the official "Merge pull request" green button, but do this first...

- Go back to the "code" tab along the top. (You will notice after doing so that there should be a number on the "pull requests" tab - thats how you get back to where you were).
- Once back on the code tab where our files are listed, I want you to toggle back to the main branch if it didnt already do it by default.
- I want you to click on the file you just updated. Again, while on the main branch.
- Look at the change you made...or wait? It looks exactly like it did prior to the changes you made? This is because we haven't finished merging our new code over to the master branch. 
- Now that you have humored me and looked at that, hopefully it helps illustrate how branches work in Git. When ready, click the "Pull Requests" tab (It shouldn't matter what branch you are on at this point so don't panic).
- Click on the request you were working on.
- And finally, because you've earned it - click "Merge pull request". You will need to click "Confirm merge" because it really wants you to be sure.

Somehow saying "and that's it!" just seems silly and lame now after all that reading, but that really is it! You can now go back to the main/code tab (and it should default to the main branch, but double check to be sure), Click on the file you made changes to just because and you should now see that on the main code, your file now has the changes that you made.

Thanks for making it this far - again, I hope to show a new way to you guys for how we can collaborate and perform work/projects much like this. Part of my job is to outline and provide details such as this to internal practices and procedures (in case that wasn't obvious), so it was fun to do. We do not need to use this by any stretch, but at the least, I hope you learned something new from it. Let me know if anything doesn't add up or make sense. Happy to address any questions. Below you will find a link to another document that is WAAAAAAAY shorter than this one. It contains just the steps of what we did here, minus the additional fun commentary.

## Links

[TLDR Steps Version](https://github.com/realatc/Baang-Cleaning-Services/blob/main/Process%20Files/Tldr-Edit-Pull-Merge-Steps.md)

#### Please excuse any misspellings or poor grammar used in this write up.
#### Worth mentioning there are a number of ways tools like Github and Gitlab are used in development work.
#### ex: control all of this within your CLI/Terminal vs through the GUI/website steps above









