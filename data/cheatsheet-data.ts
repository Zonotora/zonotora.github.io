import { CheatSheetData } from "../lib/types";

export const cheatsheetData: CheatSheetData = [
  {
    id: "docker",
    title: "docker",
    // description: "Container platform for building, shipping, and running applications",
    subsections: [
      {
        title: "Images",
        commands: [
          {
            command: "docker images",
            description: "List all images",
          },
          {
            command: "docker build -t name:tag .",
            description: "Build an image from Dockerfile",
            example: "docker build -t myapp:1.0 .",
          },
          {
            command: "docker build -t <image_name> . –no-cache",
            description: "Build an Image from a Dockerfile without the cache",
          },
          {
            command: "docker pull <image>",
            description: "Pull an image from registry",
          },
          {
            command: "docker rmi <image>",
            description: "Remove an image",
          },
          {
            command: "docker tag <source> <target>",
            description: "Tag an image",
          },
          {
            command: "docker image prune",
            description: "Remove all unused images",
          },
        ],
      },
      {
        title: "Containers",
        commands: [
          {
            command: "docker ps",
            description: "List running containers",
          },
          {
            command: "docker ps -a",
            description: "List all containers (including stopped)",
          },
          {
            command: "docker run -d -p host:container image",
            description: "Run container in detached mode with port mapping",
            example: "docker run -d -p 8080:80 nginx",
          },
          {
            command: "docker stop <container>",
            description: "Stop a running container",
          },
          {
            command: "docker start <container>",
            description: "Start a stopped container",
          },
          {
            command: "docker rm <container>",
            description: "Remove a container",
          },
          {
            command: "docker exec -it <container> bash",
            description: "Execute interactive bash in container",
          },
          {
            command: "docker logs <container>",
            description: "View container logs",
          },
          {
            command: "docker logs -f <container>",
            description: "Follow container logs",
          },
          {
            command: "docker inspect <container>",
            description:
              "To inspect a running <container_name> (or <container_id>)",
          },
          {
            command: "docker container stats",
            description: "View resource usage stats",
          },
        ],
      },
      {
        title: "System",
        commands: [
          {
            command: "docker system prune -a",
            description: "Remove all unused containers, networks, images",
          },
          {
            command: "docker system df",
            description: "Show docker disk usage",
          },
          {
            command: "docker info",
            description: "Display system-wide information",
          },
        ],
      },
    ],
  },
  {
    id: "awk",
    title: "awk",
    // description: "Text processing and data extraction language",
    commands: [
      {
        command: "awk '{print $1}'",
        description: "Print first column",
      },
      {
        command: "awk '{print $NF}'",
        description: "Print last column",
      },
    ],
  },
  {
    id: "git",
    title: "git",
    subsections: [
      {
        title: "Common",
        commands: [
          {
            command: "git status",
            description: "Show working tree status",
          },
          {
            command: "git add <file>",
            description: "Stage changes for commit",
          },
          {
            command: "git commit -m 'message'",
            description: "Commit staged changes",
          },
          {
            command: "git push origin <branch>",
            description: "Push commits to remote",
          },
          {
            command: "git pull",
            description: "Fetch and merge remote changes",
          },
          {
            command: "git branch -a",
            description: "List all branches",
          },
          {
            command: "git checkout -b <branch>",
            description: "Create and switch to new branch",
          },
          {
            command: "git merge <branch>",
            description: "Merge branch into current branch",
          },
          {
            command: "git log --oneline",
            description: "Show commit history (compact)",
          },
          {
            command: "git diff",
            description: "Show unstaged changes",
          },
          {
            command: "git reset --hard HEAD",
            description: "Discard all local changes",
          },
          {
            command: "git stash",
            description: "Temporarily save changes",
          },
          {
            command: "git stash pop",
            description: "Restore stashed changes",
          },
        ],
      },
      {
        title: "ls-files",
        commands: [
          {
            command: "git ls-files --others --exclude-standard",
            description: "To list untracked files",
          },
        ],
      },
    ],
  },
  {
    id: "sed",
    title: "sed",
    commands: [
      {
        command: "sed 's/pattern/replacement/'",
        description: "Replace first occurrence per line",
        example: "sed 's/foo/bar/' file.txt",
      },
      {
        command: "sed 's/pattern/replacement/g'",
        description: "Replace all occurrences",
      },
      {
        command: "sed -i 's/pattern/replacement/g'",
        description: "Edit file in-place",
      },
      {
        command: "sed -n '5,10p'",
        description: "Print lines 5 to 10",
      },
      {
        command: "sed '/pattern/d'",
        description: "Delete lines matching pattern",
      },
      {
        command: "sed '5d'",
        description: "Delete line 5",
      },
      {
        command: "sed -n '/pattern/p'",
        description: "Print only matching lines",
      },
    ],
  },
  {
    id: "grep",
    title: "grep",
    commands: [
      {
        command: "grep 'pattern' file",
        description: "Search for pattern in file",
      },
      {
        command: "grep -r 'pattern' dir/",
        description: "Recursively search directory",
      },
      {
        command: "grep -i 'pattern' file",
        description: "Case-insensitive search",
      },
      {
        command: "grep -v 'pattern' file",
        description: "Invert match (exclude pattern)",
      },
      {
        command: "grep -n 'pattern' file",
        description: "Show line numbers",
      },
      {
        command: "grep -c 'pattern' file",
        description: "Count matching lines",
      },
      {
        command: "grep -A 3 'pattern' file",
        description: "Show 3 lines after match",
      },
      {
        command: "grep -B 3 'pattern' file",
        description: "Show 3 lines before match",
      },
      {
        command: "grep -E 'pattern1|pattern2' file",
        description: "Extended regex (OR)",
      },
    ],
  },
];
